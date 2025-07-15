import jwt, { JwtPayload } from "jsonwebtoken"

function generateAccessToken(email: string, id: number) {
    const token = jwt.sign({
        email,
        id
    }, process.env.JSONWEBTOKENSECRET as string, { expiresIn: '24h' });
    return token
}

function verifyToken(token: string): [boolean, any] {
    try {
        const isVerifiedData = jwt.verify(token, process.env.JSONWEBTOKENSECRET as string) as JwtPayload
        return [true, isVerifiedData]
    } catch (err) {
        return [false, null]
    }
}

export {
    generateAccessToken,
    verifyToken
}
