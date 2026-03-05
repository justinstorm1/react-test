import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    games: defineTable({
        hostId: v.id("users"),
        code: v.string(),
        players: v.optional(v.array(v.id("users"))),
        started: v.boolean(),
    }).index("by_code", ["code"])
})

export default schema;