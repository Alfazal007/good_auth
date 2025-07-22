import jwt from "jsonwebtoken"

export function generateToken(signature: string, secret: string) {
    const token = jwt.sign({ signature }, secret, {
        expiresIn: "24h"
    })
    return token
}
