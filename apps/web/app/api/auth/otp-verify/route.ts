import { NextRequest, NextResponse } from "next/server"
import { tryCatch } from "../../../helpers/tryCatch"
import { otpType } from "../../../zodTypes/otp/otpType"
import { db } from "../../../../database"
import { databaseSchema, drizzleOrm } from "@repo/database"

export async function POST(req: NextRequest) {
    const body = await tryCatch(req.json())
    const parsedData = otpType.safeParse(body.data)
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

    if (userFromDb.otp != parsedData.data.otp) {
        return NextResponse.json({
            message: "Invalid OTP"
        }, {
            status: 400
        })
    }

    if (!userFromDb.isVerified) {
        const dbResult = await tryCatch(db.update(databaseSchema.usersTable).set({
            isVerified: true
        }))
        if (dbResult.error) {
            return NextResponse.json({
                message: "Issue talking to the database"
            }, {
                status: 400
            })
        }
    }
    return NextResponse.json({
        message: "User verified",
    }, {
        status: 200
    })
}
