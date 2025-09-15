import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's generation history
export const getUserGenerations = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            return [];
        }

        const generations = await ctx.db
            .query("generations")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();

        return generations;
    },
});

// Save generation result
export const saveGeneration = mutation({
    args: {
        prompt: v.string(),
        platforms: v.array(v.string()),
        results: v.array(v.object({
            platform: v.string(),
            content: v.string(),
        })),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const generationId = await ctx.db.insert("generations", {
            userId: user._id,
            prompt: args.prompt,
            platforms: args.platforms,
            results: args.results,
            createdAt: Date.now(),
        });

        return generationId;
    },
});