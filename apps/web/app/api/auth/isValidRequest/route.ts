import { authNormalUser } from "@/helpers/authNormalUser"
import { tryCatch } from "@/helpers/tryCatch"
import { authCheckApiKey } from "@/zodTypes/auth/validAuthCheckForNormalClients"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const bodyResult = await tryCatch(req.json())
    if (bodyResult.error) {
        return NextResponse.json({ message: "invalid request body" }, {
            status: 400
        })
    }
    const parsedData = authCheckApiKey.safeParse(bodyResult.data)
    if (!parsedData.success) {
        return
    }
    const isValidUser = await authNormalUser(parsedData.data.apiKey, parsedData.data.email, parsedData.data.token)
    const status = isValidUser == true ? 200 : 401
    return NextResponse.json({}, {
        status
    })
}
