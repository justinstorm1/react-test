import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internal } from './_generated/api';

export const createGame = mutation({
    handler: async (ctx) => {
        const questions = [
            {
                optionA: "Be able to fly",
                optionB: "Be invisible"
            },
            {
                optionA: "Live in the city",
                optionB: "Live in the countryside"
            },
            {
                optionA: "Have a personal chef",
                optionB: "Have a personal driver"
            }
        ]
        const hostId = await getAuthUserId(ctx);
        if (!hostId) return null;
        const newGame = await ctx.db.insert("games", {
            hostId,
            code: Math.random().toString().substring(2, 8).toUpperCase(),
            started: false,
            questions: questions,
            voting: false,
            ended: false
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
        if (game?.players?.includes(userId)) {
            return game._id;
        }
        await ctx.db.patch(game._id, {
            players: game.players ? [...game.players, userId] : [userId],
        });
        return game._id;
    }
})

export const deleteGame = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        await ctx.db.delete(gameId);
    }
})

export const leaveGame = mutation({
    args: { 
        gameId: v.id("games"),
        userId: v.id("users")  
    },
    handler: async (ctx, { gameId, userId }) => {
        const user = await ctx.db.get(userId);
        if (!user) return null;

        const game = await ctx.db.get(gameId);
        if (!game) return null;

        const newPlayers = game?.players?.filter(player => player !== user._id);

        await ctx.db.patch(game._id, {
            players: newPlayers,
        });

        return { success: true };
    },
});

export const startGame = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, { 
            started: true,
            questionIndex: 0,
            voting: true,
        })
    }
})

export const submitAnswer = mutation({
    args: {
        gameId: v.id("games"),
        questionIndex: v.number(),
        option: v.union(v.literal("A"), v.literal("B")),
    },
    handler: async (ctx, { gameId, questionIndex, option }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;

        const game = await ctx.db.get(gameId);
        if (!game) return null;

        const question = game.questions?.[questionIndex];
        if (!question) return null;

        const votesA = question.votesA ?? [];
        const votesB = question.votesB ?? [];

        // 🚫 Prevent double voting
        if (votesA.includes(userId) || votesB.includes(userId)) {
            return null;
        }

        const questions = [...(game.questions ?? [])];
        const currentQuestion = questions[questionIndex];

        if (option === "A") {
            currentQuestion.votesA = [...votesA, userId];
        }

        if (option === "B") {
            currentQuestion.votesB = [...votesB, userId];
        }

        questions[questionIndex] = currentQuestion;

        await ctx.db.patch(gameId, {
            questions,
        });
    },
});

export const revealVotes = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: false
        })
    }
});

export const nextQuestion = mutation({
    args: { gameId: v.id("games"), },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: true,
            questionIndex: (game.questionIndex ?? 0) + 1
        })
    }
})

export const endGame = mutation({
    args: { gameId: v.id("games"), },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: false,
            ended: true
        })
    }
})