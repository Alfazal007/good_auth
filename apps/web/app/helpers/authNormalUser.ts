import { isUserAuthenticated } from "./isUserAuthenticated";

export async function authNormalUser(apiKey: string, email: string, token: string): Promise<boolean> {
    return isUserAuthenticated(token, apiKey, email)
}
