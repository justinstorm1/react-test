import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    games: defineTable({
        hostId: v.id("users"),
        code: v.string(),
        players: v.optional(v.array(
            v.object({
                userId: v.id("users"),
                name: v.string()
            })
        )),
        started: v.boolean(),
        questions: v.optional(
            v.array(
                v.object({
                    optionA: v.string(),
                    optionB: v.string(),
                    votesA: v.optional(v.array(v.id("users"))),
                    votesB: v.optional(v.array(v.id("users"))),
                })
            )
        ),
        questionIndex: v.optional(v.number()),
        voting: v.boolean(),
        ended: v.boolean(),
    }).index("by_code", ["code"])
})

export default schema;