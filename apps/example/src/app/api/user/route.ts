import { NextRequest, NextResponse } from "next/server";
import { auth } from "@itachi__uchiha/goodauthbe"

export async function GET(req: NextRequest) {
    const apiKey = process.env.GOODAUTHAPIKEY!
    const apiSecret = process.env.GOODAUTHAPISECRET!
    const isValidUser = auth(req, apiKey, apiSecret)
    if (!isValidUser) {
        return NextResponse.json({ message: "invalid" }, {
            status: 400
        })
    }
    return NextResponse.json({ message: "valid" }, {
        status: 200
    })
}
