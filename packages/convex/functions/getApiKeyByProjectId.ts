import { v } from "convex/values";
import { query } from "./_generated/server";

export const getApiKeyByProjectId = query({
    args: {
        id: v.id("organizations"),
    },
    handler: async (ctx, args) => {
        const project = await ctx.db
            .query("projects")
            .filter((q) => q.eq(q.field("organization"), args.id))
            .first()

        if (!project) {
            throw new Error("Project not found for organization");
        }

        return {
            apiKey: project.apiKey,
            apiSecret: project.apiSecret,
        };
    },
});

