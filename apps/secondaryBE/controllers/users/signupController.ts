import type { Request, Response } from "express";
import { userAuthType } from "../../zodTypes/userAuthType";
import { tryCatch } from "../../helpers/tryCatch";
import { convexClient } from "../../helpers/convex";
import { api } from "@repo/convex"
import type { Id } from "@repo/convex/convex/_generated/dataModel";
import { db } from "../../helpers/database";
import { databaseSchema } from "@repo/database";
import { eq, and } from 'drizzle-orm';
import { hashPassword } from "../../helpers/hashPassword";

export async function signupController(req: Request, res: Response) {
    try {
        const body = req.body
        if (!body) {
            return res.status(400).json({
                message: "no request body provided"
            })
        }
        console.log({ body })
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
        if (existingData) {
            return res.status(500).json({
                message: "choose a different email"
            })
        }

        const hashedPassword = await hashPassword(parsedData.data.password)
        const newInsertedRowResult = await tryCatch(db.insert(databaseSchema.normalTable).values({
            email: parsedData.data.email,
            organization: parsedData.data.orgId,
            password: hashedPassword,
        }))
        if (newInsertedRowResult.error) {
            return res.status(500).json({
                message: "issue talking to the database"
            })
        }
        return res.status(201).json({
            message: "created user successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Issue signing up"
        })
    }
}
