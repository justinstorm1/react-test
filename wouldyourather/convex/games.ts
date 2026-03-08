import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internal } from './_generated/api';

const questions = [
    { optionA: "Have a rewind button for your life", optionB: "Have a pause button for your life" },
    { optionA: "Only communicate in memes", optionB: "Only communicate in movie quotes" },
    { optionA: "Fight one horse-sized duck", optionB: "Fight 100 duck-sized horses" },
    { optionA: "Always know when someone is lying", optionB: "Always get away with lying" },
    { optionA: "Live in a futuristic cyberpunk city", optionB: "Live in a medieval fantasy world" },
    { optionA: "Be famous but constantly criticized", optionB: "Be unknown but extremely respected" },
    { optionA: "Accidentally send every text to your mom", optionB: "Accidentally send every text to your boss" },
    { optionA: "Be able to teleport anywhere", optionB: "Be able to stop time for 10 seconds" },
    { optionA: "Have unlimited money but no free time", optionB: "Have unlimited free time but average money" },
    { optionA: "Know how you die", optionB: "Know when you die" },

    { optionA: "Have a dragon as a pet", optionB: "Have a robot butler" },
    { optionA: "Only eat cold food forever", optionB: "Only eat food that’s slightly burnt" },
    { optionA: "Be stuck in a time loop for one day", optionB: "Skip forward 10 years instantly" },
    { optionA: "Have super speed but trip often", optionB: "Have super strength but break everything" },
    { optionA: "Win the lottery but lose all friends", optionB: "Keep friends but never be rich" },
    { optionA: "Have a theme song that plays everywhere you go", optionB: "Have a laugh track play after everything you say" },
    { optionA: "Be able to breathe underwater", optionB: "Be immune to extreme temperatures" },
    { optionA: "Live without music", optionB: "Live without movies and TV" },
    { optionA: "Be extremely lucky", optionB: "Be extremely intelligent" },
    { optionA: "Have perfect memory", optionB: "Be able to forget anything you want" },

    { optionA: "Be the smartest person alive", optionB: "Be the funniest person alive" },
    { optionA: "Have the ability to talk to animals", optionB: "Have animals understand everything you say" },
    { optionA: "Live in space", optionB: "Live underwater" },
    { optionA: "Always be 10 minutes late", optionB: "Always be 20 minutes early" },
    { optionA: "Have unlimited pizza", optionB: "Have unlimited tacos" },
    { optionA: "Be able to see 10 minutes into the future", optionB: "Be able to see 10 minutes into the past" },
    { optionA: "Have your dream job", optionB: "Never have to work again" },
    { optionA: "Be stuck in a zombie apocalypse", optionB: "Be stuck in an alien invasion" },
    { optionA: "Be able to read minds", optionB: "Be able to control minds" },
    { optionA: "Never feel tired", optionB: "Only need 2 hours of sleep" },

    { optionA: "Be incredibly attractive", optionB: "Be incredibly charismatic" },
    { optionA: "Have a photographic memory", optionB: "Have perfect creativity" },
    { optionA: "Always have perfect internet", optionB: "Always have perfect battery life" },
    { optionA: "Have a mansion in the mountains", optionB: "Have a penthouse in the city" },
    { optionA: "Only watch new movies", optionB: "Only watch movies you've already seen" },
    { optionA: "Be able to shapeshift", optionB: "Be able to clone yourself once per day" },
    { optionA: "Have a pause button for arguments", optionB: "Have a reset button for awkward moments" },
    { optionA: "Never feel embarrassment", optionB: "Never feel fear" },
    { optionA: "Have every language automatically translated", optionB: "Be fluent in every language" },
    { optionA: "Have unlimited energy drinks", optionB: "Have unlimited coffee" },

    { optionA: "Live 500 years", optionB: "Live 80 perfect years" },
    { optionA: "Always know the right thing to say", optionB: "Always say the funniest thing possible" },
    { optionA: "Have perfect aim", optionB: "Have perfect balance" },
    { optionA: "Be trapped in a video game world", optionB: "Be trapped in a movie world" },
    { optionA: "Be able to summon food instantly", optionB: "Be able to summon any object instantly" },
    { optionA: "Never get sick", optionB: "Never get injured" },
    { optionA: "Be able to breathe in space", optionB: "Be able to survive any fall" },
    { optionA: "Always win debates", optionB: "Always win games" },
    { optionA: "Be able to talk to your past self", optionB: "Be able to talk to your future self" },
    { optionA: "Live without the internet", optionB: "Live without air conditioning/heating" },

    { optionA: "Have your own private island", optionB: "Have your own private jet" },
    { optionA: "Be stuck in the Stone Age", optionB: "Be stuck in the far future" },
    { optionA: "Have the power of teleportation", optionB: "Have the power of time travel" },
    { optionA: "Always win rock-paper-scissors", optionB: "Always guess coin flips correctly" },
    { optionA: "Be the best gamer in the world", optionB: "Be the best athlete in the world" },
    { optionA: "Never feel pain", optionB: "Never feel sadness" },
    { optionA: "Be able to freeze time for everyone else", optionB: "Move at 10x speed compared to everyone" },
    { optionA: "Be famous on the internet", optionB: "Be famous in real life" },
    { optionA: "Only listen to one song forever", optionB: "Never listen to music again" },
    { optionA: "Be a wizard", optionB: "Be a superhero" },

    { optionA: "Have the ability to heal people", optionB: "Have the ability to bring people back to life once" },
    { optionA: "Always have perfect weather", optionB: "Always have perfect temperature" },
    { optionA: "Be stuck with dial-up internet", optionB: "Only use a flip phone forever" },
    { optionA: "Have a talking dog", optionB: "Have a talking cat" },
    { optionA: "Be able to see ghosts", optionB: "Be able to become invisible to ghosts" },
    { optionA: "Only eat sweet food", optionB: "Only eat salty food" },
    { optionA: "Be able to fly but only 10 feet high", optionB: "Run 60 mph but only for 10 seconds" },
    { optionA: "Know every secret about everyone", optionB: "Have no secrets about yourself" },
    { optionA: "Be stuck in a horror movie", optionB: "Be stuck in a comedy movie" },
    { optionA: "Have unlimited knowledge", optionB: "Have unlimited creativity" },

    { optionA: "Be the villain in a movie", optionB: "Be the side character everyone loves" },
    { optionA: "Always smell amazing", optionB: "Always look amazing" },
    { optionA: "Have a house that cleans itself", optionB: "Have food that cooks itself" },
    { optionA: "Have super hearing", optionB: "Have super vision" },
    { optionA: "Be able to erase memories", optionB: "Be able to restore forgotten memories" },
    { optionA: "Be a pirate", optionB: "Be a cowboy" },
    { optionA: "Always win every argument", optionB: "Always avoid arguments entirely" },
    { optionA: "Be able to pause dreams", optionB: "Be able to control dreams" },
    { optionA: "Have a robot body", optionB: "Have a genetically perfect human body" },
    { optionA: "Live in a giant treehouse", optionB: "Live in an underground bunker" },

    { optionA: "Have perfect luck in games", optionB: "Have perfect skill in games" },
    { optionA: "Be able to summon storms", optionB: "Be able to control fire" },
    { optionA: "Be stuck in your favorite game", optionB: "Be stuck in your favorite show" },
    { optionA: "Always get front row seats", optionB: "Always skip every line" },
    { optionA: "Be able to run on water", optionB: "Be able to climb anything" },
    { optionA: "Never experience boredom", optionB: "Never experience stress" },
    { optionA: "Have a lightsaber", optionB: "Have an Iron Man suit" },
    { optionA: "Always find lost things", optionB: "Never lose things in the first place" },
    { optionA: "Have a secret underground lair", optionB: "Have a flying base in the sky" },
    { optionA: "Restart life with all your memories", optionB: "Restart life with perfect luck" }
];

export const createGame = mutation({
    handler: async (ctx) => {
        function getRandomQuestions(arr: any[], count: number) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        const hostId = await getAuthUserId(ctx);
        if (!hostId) return null;
        const newGame = await ctx.db.insert("games", {
            hostId,
            code: Math.random().toString().substring(2, 8).toUpperCase(),
            started: false,
            questions: getRandomQuestions(questions, 10),
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
    args: { 
        code: v.string(),
        name: v.string()
    },
    handler: async (ctx, { code, name }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;
        const game = await ctx.db
            .query("games")
            .withIndex("by_code", q => q.eq("code", code))
            .first();
        if (!game) return null;
        
        const players = game.players ?? [];
        if (!players.find(p => p.userId === userId)) {
            players.push({
                userId,
                name
            })
        }

        await ctx.db.patch(game._id, {
            players
        })

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

        const newPlayers = game?.players?.filter(player => player.userId !== user._id);

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
});

export const getPlayer = query({
    args: {
        gameId: v.id("games"),
        userId: v.id("users"),
    },
    handler: async (ctx, { gameId, userId }) => {
        const game = await ctx.db.get(gameId);

        const user = await ctx.db.get(userId);

        const player = await game?.players?.find(player => player.userId === user?._id);

        return player;

    }
})

export const getGameFromCode = mutation({
    args: { code: v.string() },
    handler: async (ctx, { code }) => {
        const game = await ctx.db
            .query("games")
            .withIndex("by_code", q => q.eq("code", code))
            .first();
        if (!game) return null;
        return game._id;
    }
})