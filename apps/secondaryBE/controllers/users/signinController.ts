import type { Request, Response } from "express";

export async function signinController(req: Request, res: Response) {
    try {

    } catch (err) {
        return res.status(500).json({
            message: "Issue signing in"
        })
    }
}
