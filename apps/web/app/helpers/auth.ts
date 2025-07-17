import { NextRequest } from "next/server";
import { tryCatch } from "./tryCatch";
import { redis } from "./redis";

export async function auth(req: NextRequest): Promise<{ email: string, token: string, id: number } | null> {
    const email = req.cookies.get("email")?.value;
    const token = req.cookies.get("accessToken")?.value;
    const idString = req.cookies.get("id")?.value;
    if (!email || !token || !idString) {
        return null
    }
    let idInt = parseInt(idString)
    if (!idInt) {
        return null
    }
    if (!redis.isReady) {
        await redis.connect()
    }
    const redisData = await tryCatch(redis.get(`ACCESSTOKENORGS:${idInt}`))
    if (redisData.error) {
        console.log({ err: redisData.error })
        return null
    }
    let data = redisData.data
    if (!data) {
        return null
    }
    if (data != token) {
        return null
    }
    return { email, token, id: idInt }
}
