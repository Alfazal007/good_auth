import { createVerify } from 'crypto'

export function verifyEmailSignature(email: string, signature: string, publicKey: string): boolean {
    const verify = createVerify('SHA256')
    verify.update(email)
    verify.end()

    return verify.verify(publicKey, signature, 'base64')
}
