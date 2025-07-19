import jwt, { JwtPayload } from "jsonwebtoken"
import { decodeBase64 } from 'tweetnacl-util';
import nacl from 'tweetnacl';

export function isUserAuthenticated(token: string, apiKey: string, email: string): boolean {
    const [tokenValid, tokenData] = verifyToken(token)
    if (!tokenValid) {
        return false
    }
    const signedEmail = tokenData.signature
    return verifyEmailSignature(email, signedEmail, apiKey)
}

function verifyToken(token: string): [boolean, any] {
    try {
        const isVerifiedData = jwt.verify(token, process.env.JSONWEBTOKENSECRET as string) as JwtPayload
        return [true, isVerifiedData]
    } catch (err) {
        return [false, null]
    }
}

export function verifyEmailSignature(email: string, signatureBase64: string, publicKeyBase64: string): boolean {
    const publicKey = decodeBase64(publicKeyBase64);
    const signature = decodeBase64(signatureBase64);
    const message = new TextEncoder().encode(email);
    return nacl.sign.detached.verify(message, signature, publicKey);
}
