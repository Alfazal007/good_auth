import bcrypt from "bcryptjs"

async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, hash)
    return isValidPassword
}

export {
    hashPassword,
    comparePassword
}
