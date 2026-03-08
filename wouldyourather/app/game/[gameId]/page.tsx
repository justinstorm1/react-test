"use client"

import Player from "@/components/Player"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Field } from "@/components/ui/field"
import { Item, ItemContent, ItemActions } from "@/components/ui/item"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery, useMutation } from "convex/react"
import { ArrowLeftFromLine, Flag, FlagIcon, X, XCircleIcon, ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

export default function Page() {
    const params = useParams()
    const gameId = params?.gameId as Id<"games">;
    const router = useRouter();

    const userId = useQuery(api.users.getCurrentUserId);
    const game = useQuery(api.games.getGameFromId, { gameId: gameId! });
    const leaveGame = useMutation(api.games.leaveGame);
    const submitAnswer = useMutation(api.games.submitAnswer);

    const votedA = game?.questions?.[game.questionIndex ?? 0]?.votesA?.includes(userId!) ?? false;
    const votedB = game?.questions?.[game.questionIndex ?? 0]?.votesB?.includes(userId!) ?? false;

    const [option, setOption] = useState<"A" | "B" | undefined>(votedA ? "A" : votedB ? "B" : undefined);

    const handleLeaveGame = async () => {
        try {
            await leaveGame({ 
                gameId: game?._id!,
                userId: userId! 
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if (game && userId && !game.players?.some(player => player.userId === userId)) {
            window.history.back();
        }

        if (!game) return;
        setOption(undefined);

        if (votedA) setOption("A");
        else if (votedB) setOption("B");

    }, [game, game?.questionIndex, userId]);

    const handleSelectOption = async (selectedOption: "A" | "B") => {
        try {
            if (option === undefined) {
                if (selectedOption === "A") {
                    setOption("A");
                    await submitAnswer({
                        gameId: game?._id!,
                        questionIndex: game?.questionIndex ?? 0,
                        option: "A"
                    });
                }
                if (selectedOption === "B") {
                    setOption("B");
                    await submitAnswer({
                        gameId: game?._id!,
                        questionIndex: game?.questionIndex ?? 0,
                        option: "B"
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!game) {
        return (
            <main>
                <header className="flex items-center border-b p-4 justify-between">
                    <Button 
                        className="cursor-pointer" 
                        variant={'outline'}
                        onClick={() => router.push('/')}
                    >
                        <ArrowLeft />
                        Go Home
                    </Button>
                </header>
                <div className="p-5 space-y-10">
                    <p>Can't find your game</p>
                </div>
            </main>
        )
    }


    return (
        <main>
            {!game.started ? (
                <div>
                    <header className="flex items-center border-b p-4 justify-between">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button 
                                    className="cursor-pointer" 
                                    variant={'destructive'}
                                >
                                    <ArrowLeft />
                                    Leave Game
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                        <ArrowLeftFromLine />
                                    </AlertDialogMedia>
                                    <AlertDialogTitle>End Game?</AlertDialogTitle>
                                    <AlertDialogDescription>This action will end your game.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="cursor-pointer"
                                    >Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                        className="cursor-pointer"
                                        onClick={async () => await handleLeaveGame()} 
                                        variant={'destructive'}
                                    >Leave Game</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </header>
                    
                    <div className="p-5 text-center">
                        <h1 className="font-semibold text-2xl">Waiting for the host to start the game...</h1>
                        <div className="flex gap-4 flex-wrap justify-center mt-10">
                            {game.players && game.players.map(player => (
                                <Button 
                                    variant={'outline'} 
                                    key={player.userId} 
                                    className="px-3 py-4"
                                >
                                    <Player 
                                        gameId={game._id}
                                        userId={player.userId}
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-5 space-y-10">
                    <div className="mx-auto text-center">
                        <p>Question {(game.questionIndex ?? 0) + 1} of {game?.questions?.length ?? 0}</p>
                        <h1 className="text-3xl font-semibold">Would You Rather?</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <Card 
                            onClick={() => handleSelectOption("A")}
                            className={`cursor-pointer ${option === "A" ? "bg-primary/20 border border-primary/50" : ""}`}
                        >
                            <CardHeader className="text-center">
                                <CardTitle>{game.questions?.[game.questionIndex ?? 0]?.optionA}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card
                            onClick={() => handleSelectOption("B")} 
                            className={`cursor-pointer ${option === "B" ? "bg-primary/20 border border-primary/50" : ""}`}
                        >
                            <CardHeader className="text-center">
                                <CardTitle>{game.questions?.[game.questionIndex ?? 0]?.optionB}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                </div>
            )}

            <Item variant={'muted'} className="w-fit fixed right-5 bottom-5"> 
                <ItemContent className="font-bold text-xl">
                    {game.code}
                </ItemContent>
            </Item>
                
        </main>
    )

}