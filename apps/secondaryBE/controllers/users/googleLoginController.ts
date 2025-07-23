import type { Request, Response } from "express"
import { isTokenValid } from "../../helpers/tokenValidity"
import { OAuth2Client } from "google-auth-library"
import { tryCatch } from "../../helpers/tryCatch"
import { db } from "../../helpers/database"
import { databaseSchema } from "@repo/database"

const client = new OAuth2Client(process.env.AUTHCLIENTIDGOOGLE!)

export async function googleTokenLogin(req: Request, res: Response) {
    try {
        const { token, orgApiKey, orgId } = req.body
        console.log({ token, orgApiKey, orgId })
        const isValidUserRequestForOrg = await isTokenValid(orgId, orgApiKey)
        if (!isValidUserRequestForOrg) {
            return res.status(401).json({
                message: "Invalid api key"
            })
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        const payload = ticket.getPayload()
        if (!payload) {
            return res.status(500).json({ message: 'Google errors' })
        }
        const { name, email, picture } = payload
        if (!name || !email || !picture) {
            return res.status(500).json({ message: 'Google errors' })
        }
        const insertUserDataResult = await tryCatch(db.insert(databaseSchema.normalTable)
            .values({ email, password: "no_password", organization: orgId })
            .onConflictDoNothing().returning())
        if (!insertUserDataResult.error) {
            return res.status(500).json({ message: 'Issue talking to the database' })
        }
        return res.status(200).json({ name, email, picture })
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
