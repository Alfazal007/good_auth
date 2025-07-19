import { tryCatch } from "@/helpers/tryCatch";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@repo/convex"
import { convexClient } from "@/helpers/convex";
import { auth } from "@/helpers/auth";
import { createApiKeyType } from "@/zodTypes/project/createApiKey";
import { Id } from "@repo/convex/convex/_generated/dataModel";
import { generateEd25519KeyPair } from "@/helpers/apiKeyAndSecret";

export async function POST(req: NextRequest) {
    const user = await auth(req)
    if (!user) {
        return NextResponse.json({
            message: "Relogin"
        }, { status: 401 })
    }

    const body = await tryCatch(req.json())
    if (body.error) {
        return NextResponse.json({
            message: "Invalid request body"
        }, { status: 500 })
    }
    const parsedData = createApiKeyType.safeParse(body.data)
    if (!parsedData.success) {
        return NextResponse.json({
            message: "Project id not provided"
        }, { status: 400 })
    }

    const existingProjectResult = await tryCatch(convexClient.query(api.getOrganizationById.getOrganization, {
        id: parsedData.data.projectId as Id<"organizations">
    }))

    if (existingProjectResult.error || !existingProjectResult.data) {
        return NextResponse.json({
            message: "Issue finding the data"
        }, { status: 404 })
    }

    const userId = existingProjectResult.data.userId as number
    if (userId != user.id) {
        return NextResponse.json({
            message: "Issue finding the data"
        }, { status: 404 })
    }

    const existingProject = await tryCatch(convexClient.query(api.getApiKeyByProjectId.getApiKeyByProjectId, {
        id: parsedData.data.projectId as Id<"organizations">
    }))

    if (existingProject.data?.apiKey) {
        return NextResponse.json({
            apiKey: existingProject.data.apiKey,
            apiSecret: existingProject.data.apiSecret
        })
    }

    const { privateKey, publicKey } = generateEd25519KeyPair()

    const convexResult = await tryCatch(convexClient.mutation(api.createApiKeyAndSecret.createApiKeyAndSecret, {
        apiKey: publicKey,
        apiSecret: privateKey,
        organization: parsedData.data.projectId as Id<"organizations">
    }))

    if (convexResult.error) {
        return NextResponse.json({
            message: "Issue writing to the database"
        }, { status: 500 })
    }

    return NextResponse.json({
        apiKey: privateKey,
        apiSecret: publicKey
    })
}
