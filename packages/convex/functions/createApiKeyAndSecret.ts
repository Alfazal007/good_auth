import { mutation } from "../convex/_generated/server";
import { v } from "convex/values";

export const createApiKeyAndSecret = mutation({
    args: {
        organization: v.id("organizations"),
        apiKey: v.string(),
        apiSecret: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("projects", {
            organization: args.organization,
            apiKey: args.apiKey,
            apiSecret: args.apiSecret
        });
    },
});
