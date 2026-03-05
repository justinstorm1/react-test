"use client"

import Player from "@/components/Player"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Item, ItemContent, ItemActions } from "@/components/ui/item"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { ArrowLeftFromLine, Flag, FlagIcon, X, XCircleIcon } from "lucide-react"
import { useParams } from "next/navigation"

export default function Page() {
    const params = useParams()
    const gameId = params?.gameId as Id<"games">;

    const userId = useQuery(api.users.getCurrentUserId);
    const game = useQuery(api.games.getGameFromId, { gameId: gameId! });

    return (
        <main>
            {game?._id}
        </main>
    )

}