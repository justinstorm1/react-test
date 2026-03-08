"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function Player({ gameId, userId }: { gameId: Id<"games">, userId: Id<"users"> }) {
    const player = useQuery(api.games.getPlayer, { gameId, userId });

    return (
        <>
            {player?.name || "Unknown Player"}
        </>
    )
}