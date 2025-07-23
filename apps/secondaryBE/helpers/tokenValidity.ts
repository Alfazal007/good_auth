import { convexClient } from "./convex"
import { tryCatch } from "./tryCatch"
import { api } from "@repo/convex"
import type { Id } from "@repo/convex/convex/_generated/dataModel";

export async function isTokenValid(orgId: string, orgApiKey: string): Promise<boolean> {
    const convexDataResult = await tryCatch(convexClient.query(api.getApiKeyByProjectId.getApiKeyByProjectId, {
        id: orgId as Id<"organizations">
    }))
    if (convexDataResult.error) {
        console.log({ err: convexDataResult.error })
        return false
    }
    const { apiKey } = convexDataResult.data
    console.log({ data: convexDataResult.data })
    if (!apiKey) {
        return false
    }
    return apiKey == orgApiKey
}
