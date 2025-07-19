import type { Request, Response } from "express";
import { userAuthType } from "../../zodTypes/userAuthType";

export async function signupController(req: Request, res: Response) {
    try {
        const body = req.body
        if (!body) {
            return res.status(400).json({
                message: "no request body provided"
            })
        }
        const parsedData = userAuthType.safeParse(body)
        if (!parsedData.success) {
            const errors: string[] = []
            parsedData.error.issues.forEach((issue) => {
                errors.push(issue.message)
            })
            return res.status(400).json({
                errors
            })
        }
        // check if org exists in the convex
        // check if the database has the same combination of email and org id
        // add user to the database
    } catch (err) {
        return res.status(500).json({
            message: "Issue signing up"
        })
    }
}
