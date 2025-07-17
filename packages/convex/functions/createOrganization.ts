import { mutation } from "../convex/_generated/server";
import { v } from "convex/values";

export const createOrganization = mutation({
    args: {
        name: v.string(),
        userId: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("organizations", {
            name: args.name,
            userId: args.userId,
        });
    },
});
