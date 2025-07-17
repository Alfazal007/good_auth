import { tryCatch } from "@/helpers/tryCatch";
import { createProjectType } from "@/zodTypes/project/createProjectType";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@repo/convex"
import { convexClient } from "@/helpers/convex";
import { auth } from "@/helpers/auth";

export async function POST(req: NextRequest) {
    const requestUser = await auth(req)
    if (!requestUser) {
        return NextResponse.json({
            message: "Relogin"
        }, { status: 401 })
    }
    const bodyResult = await tryCatch(req.json())
    if (bodyResult.error) {
        return NextResponse.json({
            message: "Invalid request body"
        }, {
            status: 400
        })
    }
    const parsedData = createProjectType.safeParse(bodyResult.data)
    if (!parsedData.success) {
        let errors: string[] = []
        parsedData.error.issues.forEach((issue) => {
            errors.push(issue.message)
        })
        return NextResponse.json({ errors }, {
            status: 400
        })
    }
    await convexClient.mutation(api.createOrganization.createOrganization, {
        name: parsedData.data.name,
        userId: requestUser.id
    })
    return NextResponse.json({
        message: "success"
    }, { status: 201 })
}
