import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    organizations: defineTable({
        name: v.string(),
        userId: v.number()
    }),

    projects: defineTable({
        organization: v.id("organizations"),
        apiKey: v.string(),
        apiSecret: v.string()
    })
        .index("by_organization", ["organization"]),
})
