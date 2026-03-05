import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internal } from './_generated/api';

export const createGame = mutation({
    handler: async (ctx) => {
        const hostId = await getAuthUserId(ctx);
        if (!hostId) return null;
        const newGame = await ctx.db.insert("games", {
            hostId,
            code: Math.random().toString().substring(2, 8).toUpperCase(),
            started: false,
        });
        await ctx.scheduler.runAfter(3600000, internal.games.deleteGameInternal, { 
            gameId: newGame 
        });
        return newGame;
    },
});

export const deleteGameInternal = internalMutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        await ctx.db.delete(gameId);
    },
});

export const getGameFromId = query({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;
        return game;
    },
});

export const joinGameFromCode = mutation({
    args: { code: v.string() },
    handler: async (ctx, { code }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;
        const game = await ctx.db
            .query("games")
            .withIndex("by_code", q => q.eq("code", code))
            .first();
        if (!game) return null;
        // if (game.players && game.players.length >= 4) return null; // Max 4 players
        await ctx.db.patch(game._id, {
            players: game.players ? [...game.players, userId] : [userId],
        });
        return game._id;
    }
})