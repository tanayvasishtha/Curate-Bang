import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get current user
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        return user;
    },
});

// Create or update user
export const createUser = mutation({
    args: {
        email: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (existingUser) {
            // Update existing user
            await ctx.db.patch(existingUser._id, {
                email: args.email,
                name: args.name,
                image: args.image,
            });
            return existingUser._id;
        } else {
            // Create new user
            const userId = await ctx.db.insert("users", {
                email: args.email,
                name: args.name,
                image: args.image,
                tokenIdentifier: identity.tokenIdentifier,
            });
            return userId;
        }
    },
});