import type { Request, Response } from "express";
import { getTokens } from "../../helpers/googleHelpers/google";
import { verifyGoogleIdToken } from "../../helpers/googleHelpers/verifyGoogleIdToken";
import { tryCatch } from "../../helpers/tryCatch";
import { convexClient } from "../../helpers/convex";
import { api } from "@repo/convex";
import type { Id } from "@repo/convex/convex/_generated/dataModel";
import { signEmail } from "../../helpers/signEmailPrivateKey";
import { generateToken } from "../../helpers/jwtHandler";
import { redis } from "../../helpers/redis";
import { databaseSchema } from "@repo/database";
import { db } from "../../helpers/database";
import { normalTable } from "@repo/database/db/schema";

export async function googleCallback(req: Request, res: Response) {
    console.log("google callback called")
    const { code, state } = req.query;
    let decodedState;
    try {
        const json = Buffer.from(decodeURIComponent(state as string), "base64").toString("utf8");
        decodedState = JSON.parse(json);
    } catch (err) {
        return res.status(400).send("Invalid state encoding");
    }
    const { redirect, orgId } = decodedState;
    if (!code || !redirect || typeof redirect != "string" || !orgId || typeof orgId != "string") {
        return res.status(400).send("Missing code or state");
    }

    try {
        const tokenData = await getTokens({ code });
        const user = await verifyGoogleIdToken(tokenData.id_token)
        if (!user) {
            return res.status(400).json({ message: "Invalid payload" })
        }
        const { name, email, picture } = user
        if (!name || !email || !picture) {
            return res.status(400).json({ message: "name, email and picture should all be present" })
        }

        const insertUserDataResult = await tryCatch(db.insert(databaseSchema.normalTable)
            .values({ email, organization: orgId, password: "no_password" })
            .onConflictDoUpdate({
                target: [normalTable.email, normalTable.organization],
                set: {
                    password: "no_password"
                }
            })
            .returning())
        if (insertUserDataResult.error) {
            console.log({ error: insertUserDataResult.error })
            return res.status(500).json({
                message: "Issue writing to the database",
            })
        }
        const insertedUser = insertUserDataResult.data[0]
        if (!insertedUser) {
            console.log("here")
            return res.status(500).json({
                message: "Issue writing to the database"
            })
        }

        const convexSecretResult = await tryCatch(convexClient.query(api.getApiKeyByProjectId.getApiKeyByProjectId, {
            id: orgId as Id<"organizations">
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

        const signedEmail = signEmail(email, apiSecret)
        const accessToken = generateToken(signedEmail, apiSecret)
        if (!redis.isReady) {
            await redis.connect()
        }
        await tryCatch(redis.set(`ACCESSTOKENORGS:${insertedUser.id}`, accessToken))

        const redirectUrl = new URL(decodedState.redirect);
        redirectUrl.searchParams.set("accessToken", accessToken);
        redirectUrl.searchParams.set("email", insertedUser.email);
        redirectUrl.searchParams.set("id", insertedUser.id.toString());
        return res.redirect(redirectUrl.toString())
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).send("Authentication failed");
    }
}
