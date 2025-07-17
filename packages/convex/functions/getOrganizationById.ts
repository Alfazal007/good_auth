import { v } from "convex/values";
import { query } from "./_generated/server";

export const getOrganization = query({
    args: {
        id: v.id("organizations"),
    },
    handler: async (ctx, args) => {
        const org = await ctx.db.get(args.id);
        return org;
    },
});

