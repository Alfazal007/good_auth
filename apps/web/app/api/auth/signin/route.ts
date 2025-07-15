import { NextRequest, NextResponse } from "next/server"
import { tryCatch } from "../../../helpers/tryCatch"
import { db } from "../../../../database"
import { databaseSchema, drizzleOrm } from "@repo/database"
import { signUpType } from "@/zodTypes/users/signUpType"
import { generateAccessToken } from "@/helpers/tokens"
import { comparePassword } from "@/helpers/bcrypt"
import { redis } from "@/helpers/redis"

export async function POST(req: NextRequest) {
    const body = await tryCatch(req.json())
    const parsedData = signUpType.safeParse(body.data)
    if (!parsedData.success) {
        const errors: string[] = []
        parsedData.error.issues.forEach((issue) => {
            errors.push(issue.message)
        })
        return NextResponse.json({
            errors
        }, {
            status: 400
        })
    }

    const userExistsInDbResult = await tryCatch(db
        .select()
        .from(databaseSchema.usersTable)
        .where(drizzleOrm.eq(
            databaseSchema.usersTable.email,
            parsedData.data.email,
        ))
        .limit(1))
    if (userExistsInDbResult.error) {
        return NextResponse.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    }
    let userFromDb = userExistsInDbResult.data[0]
    if (!userFromDb) {
        return NextResponse.json({
            message: "User not found in the database"
        }, {
            status: 404
        })
    }

    if (!userFromDb.isVerified) {
        return NextResponse.json({
            message: "User not verified yet"
        }, {
            status: 400
        })
    }

    const isPasswordValid = await comparePassword(parsedData.data.password, userFromDb.password)
    if (!isPasswordValid) {
        return NextResponse.json({
            message: "Incorrect password"
        }, {
            status: 400
        })
    }
    if (!redis.isReady) {
        await redis.connect()
    }

    const accessToken = generateAccessToken(userFromDb.email, userFromDb.id)
    await tryCatch(redis.set(`ACCESSTOKENORGS:${userFromDb.id}`, accessToken))

    const response = NextResponse.json({
        message: "User logged in successfully",
    }, {
        status: 200
    })
    response.cookies.set({
        name: 'id',
        value: userFromDb.id.toString(),
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    response.cookies.set({
        name: 'email',
        value: userFromDb.email,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    response.cookies.set({
        name: 'accessToken',
        value: accessToken,
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    })
    return response
}
