import * as jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"
import { decodeBase64 } from 'tweetnacl-util'
import nacl from 'tweetnacl'
import { NextRequest } from "next/server"

export function auth(req: NextRequest): { userId: number, email: string } | null {
    const apiKey = process.env.GOODAUTHAPIKEY!
    const email = req.cookies.get("email")?.value;
    const token = req.cookies.get("accessToken")?.value;
    const idString = req.cookies.get("id")?.value;

    if (!email || !token || !idString) {
        return null
    }

    const idInt = parseInt(idString)
    if (!idInt) {
        return null
    }

    const [tokenValid, tokenData] = verifyToken(token)
    if (!tokenValid) {
        return null
    }

    const signedEmail = tokenData.signature
    let isValidEmail = verifyEmailSignature(email, signedEmail, apiKey)
    if (isValidEmail) {
        return { userId: idInt, email }
    }
    return null
}

function verifyToken(token: string): [boolean, any] {
    try {
        const isVerifiedData = jwt.verify(token, process.env.JSONWEBTOKENSECRET as string) as JwtPayload
        return [true, isVerifiedData]
    } catch (err) {
        return [false, null]
    }
}

function verifyEmailSignature(email: string, signatureBase64: string, publicKeyBase64: string): boolean {
    const publicKey = decodeBase64(publicKeyBase64)
    const signature = decodeBase64(signatureBase64)
    const message = new TextEncoder().encode(email)
    return nacl.sign.detached.verify(message, signature, publicKey)
}
