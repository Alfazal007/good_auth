import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    organizations: defineTable({
        name: v.string(),
        userId: v.number()
    }),

    projects: defineTable({
        body: v.string(),
        organization: v.id("organizations"),
        apiKey: v.string(),
        apiSecret: v.string()
    }).index("by_token", ["apiKey"]),
})
