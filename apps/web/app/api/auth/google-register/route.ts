import { tryCatch } from "@/helpers/tryCatch"
import { authGoogleType } from "@/zodTypes/auth/googleType"
import { OAuth2Client } from "google-auth-library"
import { NextRequest, NextResponse } from "next/server"
import { db } from "../../../../database"
import { databaseSchema } from "@repo/database"
import { usersTable } from "@repo/database/db/schema"
import { generateAccessToken } from "@/helpers/tokens"
import { redis } from "@/helpers/redis"

const client = new OAuth2Client(process.env.AUTHCLIENTIDGOOGLE)
export async function POST(req: NextRequest) {
    const requestBodyResult = await tryCatch(req.json())
    if (!requestBodyResult) {
        return NextResponse.json({
            message: "Invalid request body"
        }, {
            status: 400
        })
    }
    const parsedData = authGoogleType.safeParse(requestBodyResult.data)
    if (!parsedData.success) {
        const errors: string[] = []
        parsedData.error.issues.forEach((issue) => {
            errors.push(issue.message)
        })
        return NextResponse.json({
            errors
        }, { status: 400 })
    }

    const ticketResult = await tryCatch(client.verifyIdToken({
        idToken: parsedData.data.token,
        audience: process.env.AUTHCLIENTIDGOOGLE,
    }))
    if (ticketResult.error) {
        return NextResponse.json({
            message: "Issue authentication user"
        }, { status: 400 })
    }
    const payload: any = ticketResult.data.getPayload()
    const { name, email, picture } = payload
    const insertUserDataResult = await tryCatch(db.insert(databaseSchema.usersTable)
        .values({ email, isVerified: true, password: "no_password" })
        .onConflictDoUpdate({
            target: [usersTable.email],
            set: {
                isVerified: true,
            },
        }).returning())
    if (insertUserDataResult.error) {
        console.log({ error: insertUserDataResult.error })
        return NextResponse.json({
            message: "Issue writing to the database"
        }, { status: 500 })
    }
    const insertedUser = insertUserDataResult.data[0]
    if (!insertedUser) {
        return NextResponse.json({
            message: "Issue writing to the database"
        }, { status: 500 })
    }

    const accessToken = generateAccessToken(insertedUser.email, insertedUser.id)
    if (!redis.isOpen) {
        await redis.connect()
    }
    await tryCatch(redis.set(`ACCESSTOKENORGS:${insertedUser.id}`, accessToken))

    const response = NextResponse.json({
        message: "User logged in successfully",
        picture, email, name
    }, {
        status: 200
    })
    response.cookies.set({
        name: 'id',
        value: insertedUser.id.toString(),
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    response.cookies.set({
        name: 'email',
        value: insertedUser.email,
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
