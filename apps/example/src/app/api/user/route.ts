import { NextRequest, NextResponse } from "next/server";
import { auth } from "@itachi__uchiha/goodauthbe"

export async function GET(req: NextRequest, res: NextResponse) {
    const apiKey = process.env.GOODAUTHAPIKEY!
    const isValidUser = auth(req, apiKey)
    if (isValidUser) {
        return res.json()
    }
}
