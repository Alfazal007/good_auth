import { tryCatch } from "@/helpers/tryCatch";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@repo/convex"
import { convexClient } from "@/helpers/convex";
import { auth } from "@/helpers/auth";

export async function GET(req: NextRequest) {
    const user = await auth(req)
    if (!user) {
        return NextResponse.json({
            message: "Relogin"
        }, { status: 401 })
    }

    const existingProjectsResult = await tryCatch(convexClient.query(api.getOrgForUserId.getOrgByUserId, {
        id: user.id
    }))

    if (existingProjectsResult.error) {
        return NextResponse.json({
            message: "Issue finding the data"
        }, { status: 404 })
    }

    const existingProjects = existingProjectsResult.data
    return NextResponse.json({
        projects: existingProjects
    }, { status: 200 })
}
