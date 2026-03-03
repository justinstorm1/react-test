import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    games: defineTable({
        code: v.string(),
        players: v.array(v.id("users")),
    })
})

export default schema;