import jwt from "jsonwebtoken"

export function generateToken(signature: string) {
    const token = jwt.sign({ signature }, process.env.JSONWEBTOKENSECRET!, {
        expiresIn: "24h"
    })
    return token
}
