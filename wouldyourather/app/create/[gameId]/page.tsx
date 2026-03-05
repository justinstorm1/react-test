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

    if (!game) return <div>Loading...</div>

    return (
        <main>
            <header className="flex items-center border-b p-4 justify-between">
                <Button 
                    variant={'destructive'} 
                    onClick={() => window.history.back()}
                    className="cursor-pointer"
                >
                    <FlagIcon />
                    End Game
                </Button>
                <Button variant={'default'} onClick={() => window.history.back()}>
                    <FlagIcon />
                    Start Game
                </Button>
            </header>

            <div className="p-5 space-y-10">
                <Card className="flex-1 max-w-md mx-auto">
                    <CardHeader className="text-center">
                        <CardDescription>Join Code</CardDescription>
                        <CardTitle className="font-bold text-6xl">{game.code}</CardTitle>
                    </CardHeader>
                </Card>

             {game.players && game.players.map(userId => (
                <Item variant={'muted'} key={userId} className="w-fit">
                    <ItemActions>
                        <Button variant={'ghost'} size="icon" className="cursor-pointer rounded-full">
                            <X />
                        </Button>
                    </ItemActions>
                    <ItemContent>
                        <Player userId={userId} />
                    </ItemContent>
                </Item>
            ))}
            </div>
        </main>
    )
}