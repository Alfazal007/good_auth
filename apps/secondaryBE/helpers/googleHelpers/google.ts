import axios from "axios"
import qs from "qs"

export function getGoogleAuthURL({ state }: any) {
    const params = new URLSearchParams({
        client_id: process.env.AUTHCLIENTIDGOOGLE!,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state,
        redirect_uri: "http://localhost:8000/oauth/google/callback",
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

export async function getTokens({ code }: any) {
    const res = await axios.post(
        "https://oauth2.googleapis.com/token",
        qs.stringify({
            code,
            client_id: process.env.AUTHCLIENTIDGOOGLE!,
            client_secret: process.env.AUTHCLIENTSECRETGOOGLE!,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:8000/oauth/google/callback",
        }),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
    )
    return res.data
}
