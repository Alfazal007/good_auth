import type { Request, Response } from "express";
import { userAuthType } from "../../zodTypes/userAuthType";
import { tryCatch } from "../../helpers/tryCatch";
import { convexClient } from "../../helpers/convex";
import { api } from "@repo/convex"
import type { Id } from "@repo/convex/convex/_generated/dataModel";
import { db } from "../../helpers/database";
import { databaseSchema } from "@repo/database";
import { eq, and } from 'drizzle-orm';
import { comparePassword } from "../../helpers/hashPassword";
import { signEmail } from "../../helpers/signEmailPrivateKey";
import { redis } from "../../helpers/redis";
import { generateToken } from "../../helpers/jwtHandler";

export async function signinController(req: Request, res: Response) {
    try {
        const body = req.body
        if (!body) {
            return res.status(400).json({
                message: "no request body provided"
            })
        }
        const parsedData = userAuthType.safeParse(body)
        if (!parsedData.success) {
            const errors: string[] = []
            parsedData.error.issues.forEach((issue) => {
                errors.push(issue.message)
            })
            return res.status(400).json({
                errors
            })
        }

        const convexOrgResult = await tryCatch(convexClient.query(api.getOrganizationById.getOrganization, {
            id: parsedData.data.orgId as Id<"organizations">
        }))
        if (convexOrgResult.error) {
            return res.status(404).json({
                message: "org not found"
            })
        }
        const org = convexOrgResult.data
        if (!org) {
            return res.status(404).json({
                message: "org not found"
            })
        }

        const existingDataResult = await tryCatch(db.select()
            .from(databaseSchema.normalTable)
            .where(
                and(
                    eq(databaseSchema.normalTable.email, parsedData.data.email),
                    eq(databaseSchema.normalTable.organization, parsedData.data.orgId)
                )
            )
        )
        if (existingDataResult.error) {
            return res.status(500).json({
                message: "issue talking to the database"
            })
        }

        const existingData = existingDataResult.data[0]
        if (!existingData) {
            return res.status(404).json({
                message: "could not find the user in the database"
            })
        }
        const isValidPassword = await comparePassword(parsedData.data.password, existingData.password)
        if (!isValidPassword) {
            return res.status(400).json({
                message: "invalid password"
            })
        }

        const convexSecretResult = await tryCatch(convexClient.query(api.getApiKeyByProjectId.getApiKeyByProjectId, {
            id: parsedData.data.orgId as Id<"organizations">
        }))
        if (convexSecretResult.error) {
            return res.status(404).json({
                message: "org not found"
            })
        }
        const { apiKey, apiSecret } = convexSecretResult.data

        if (!apiKey || !apiSecret) {
            return res.status(404).json({
                message: "org not found"
            })
        }

        const signedEmail = signEmail(existingData.email, apiSecret)
        const accessToken = generateToken(signedEmail, apiSecret)
        if (!redis.isReady) {
            await redis.connect()
        }

        await tryCatch(redis.set(`ACCESSTOKENORGS:${existingData.id}`, accessToken))
        return res
            .status(200)
            .cookie("id", existingData.id, {
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            })
            .cookie("email", existingData.email, {
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            })
            .cookie("accessToken", accessToken, {
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            })
            .json({
                email: existingData.email,
                accessToken,
                id: existingData.id
            })
    } catch (err) {
        return res.status(500).json({
            message: "Issue signing up"
        })
    }
}
