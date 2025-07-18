import { v } from "convex/values";
import { query } from "./_generated/server";

export const getOrgByUserId = query({
    args: {
        id: v.number(),
    },
    handler: async (ctx, args) => {
        const orgs = await ctx.db
            .query("organizations")
            .filter((q) => q.eq(q.field("userId"), args.id))
            .collect()
        if (!orgs) {
            throw new Error("Project not found for organization");
        }
        return orgs
    },
});

