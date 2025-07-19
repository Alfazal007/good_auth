import { createSign } from 'crypto';

export function signEmail(email: string, privateKey: string): string {
    const sign = createSign('SHA256')
    sign.update(email)
    sign.end()

    const signature = sign.sign(privateKey, 'base64')
    return signature
}

