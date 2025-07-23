import { OAuth2Client } from "google-auth-library"
const client = new OAuth2Client(process.env.AUTHCLIENTIDGOOGLE)

export async function verifyGoogleIdToken(idToken: string) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload();
    if (!payload || !payload.email_verified) {
        throw new Error("Email not verified");
    }
    return payload
}
