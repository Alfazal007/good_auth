import { NextRequest, NextResponse } from "next/server"
import { signUpType } from "../../../zodTypes/users/signUpType"
import { databaseSchema, drizzleOrm } from "@repo/database"
import { tryCatch } from "../../../helpers/tryCatch"
import { db } from "../../../../database"
import { hashPassword } from "../../../helpers/bcrypt"

export async function POST(req: NextRequest) {
    const body = await tryCatch(req.json())
    if (body.error) {
        return NextResponse.json({
            message: "Invalid request body"
        }, {
            status: 500
        })
    }

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
    if (userExistsInDbResult.data[0]) {
        return NextResponse.json({
            message: "Choose different username"
        }, {
            status: 400
        })
    }

    const hashedPassword = await hashPassword(parsedData.data.password)
    const insertDataResult = await tryCatch(db.insert(databaseSchema.usersTable).values({
        email: parsedData.data.email,
        password: hashedPassword
    }))
    if (insertDataResult.error) {
        return NextResponse.json({
            message: "Issue inserting data to database"
        }, {
            status: 500
        })
    }

    return NextResponse.json({
        message: "Created user successfully",
    }, {
        status: 201
    })
}
