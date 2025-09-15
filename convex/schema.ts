import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),

    generations: defineTable({
        userId: v.id("users"),
        prompt: v.string(),
        platforms: v.array(v.string()),
        results: v.array(v.object({
            platform: v.string(),
            content: v.string(),
        })),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),
});