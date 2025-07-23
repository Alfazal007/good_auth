import type { Request, Response } from "express"
import { getGoogleAuthURL } from "../../helpers/googleHelpers/google"

export function startGoogleAuth(req: Request, res: Response) {
    const redirect = req.query.redirect
    const apiKey = req.query.apiKey
    const orgId = req.query.orgId
    if (!redirect || !orgId || !apiKey) {
        return res.status(400).json({
            message: "redirect url, orgid and apikey must all be provided"
        })
    }
    const statePayload = {
        redirect,
        orgId
    };
    const state = encodeURIComponent(Buffer.from(JSON.stringify(statePayload)).toString("base64"));
    const authUrl = getGoogleAuthURL({ state });
    return res.redirect(authUrl)
}
