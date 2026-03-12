"use client"

import Player from "@/components/Player"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Item, ItemContent, ItemActions } from "@/components/ui/item"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery, useMutation } from "convex/react"
import { ArrowLeftFromLine, Flag, FlagIcon, X, XCircleIcon, ArrowLeft, XIcon, BookmarkCheckIcon } from "lucide-react"
import { getFrameSource } from "next/dist/next-devtools/shared/stack-frame";
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const params = useParams()
    const gameId = params?.gameId as Id<"games">;
    
    const game = useQuery(api.games.getGameFromId, { gameId: gameId! });
    const deleteGame = useMutation(api.games.deleteGame);
    const removePlayer = useMutation(api.games.leaveGame);
    const startGame = useMutation(api.games.startGame);
    const revealVotes = useMutation(api.games.revealVotes);
    const nextQuestion = useMutation(api.games.nextQuestion);
    const endGame = useMutation(api.games.endGame);
    const createGame = useMutation(api.games.createGame);
    const [voteStart, setVoteStart] = useState<number | null>(null);
    const [now, setNow] = useState(Date.now());
    const duration = 20000;
    
    useEffect(() => {
        if (!game?.voting) return;

        if ((game?.questions?.[questionIndex].votesA?.length ?? 0) + (game?.questions?.[questionIndex].votesB?.length ?? 0) >= (game?.players?.length ?? 0)) {
            handleRevealVotes();
        }
    }, [game]);

    useEffect(() => {
        if (!game?.voting) return;

        const start = Date.now();
        setVoteStart(start);

        const interval = setInterval(() => {
            const current = Date.now();
            setNow(current);

            if (current - start >= duration) {
                clearInterval(interval);
                handleRevealVotes();
            }
        }, 50); // smooth updates

        return () => clearInterval(interval);
    }, [game?.questionIndex, game?.voting]);

    const elapsed = voteStart ? Date.now() - voteStart : 0;
    const remaining = Math.max(duration - elapsed, 0);
    const timePercent = `${(remaining / duration) * 100}%`;

    if (!game) {
        return (
            <main className="min-h-screen flex flex-col">
                <header className="flex items-center border-b p-4 justify-between">
                    <Button 
                        className="cursor-pointer" 
                        variant={'outline'}
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft />
                        Go Back
                    </Button>
                </header>
                <div className="p-5 space-y-10">
                    <p>Can't find your game</p>
                </div>
            </main>
        )
    }

    const handleDeleteGame = async () => {
        try {
            await deleteGame({ gameId });
            window.history.back();
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemovePlayer = async (userId: Id<"users">) => {
        try {
            await removePlayer({ 
                gameId: gameId!, 
                userId
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleStartGame = async () => {
        try {
            await startGame({ gameId: gameId! });
        } catch (error) {
            console.error(error);
        }
    }

    const handleRevealVotes = async () => {
        try {
            await revealVotes({ gameId });
        } catch (error) {
            console.error(error);
        }
    }

    const handleNextQuestion = async () => {
        try {
            await nextQuestion({ gameId });
        } catch (error) {
            console.error(error);
        }
    }

    const handleEndGame = async () => {
        try {
            await endGame({ gameId });
        } catch (error) {
            console.error(error);
        }
    }

    const handleNewGame = async () => {
        try {
            await deleteGame({ gameId: game._id });
            const gameId = await createGame();
            router.push(`/create/${gameId}`);
        } catch (error) {
            console.error(error);
        }
    }


    const questionIndex = game.questionIndex ?? 0;
    const question = game.questions?.[questionIndex];
    const totalQuestions = game.questions?.length ?? 0;
    const isLastQuestion = questionIndex + 1 === totalQuestions;

    const votesA = question?.votesA?.length ?? 0;
    const votesB = question?.votesB?.length ?? 0;
    const totalVotes = votesA + votesB;


    return (
        <main>
            <div>
                <header className="flex items-center border-b p-4 justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button 
                                className="cursor-pointer" 
                                variant={'destructive'}
                                >
                                <FlagIcon />
                                End Game
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Flag />
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
                                    onClick={() => handleDeleteGame()} 
                                    variant={'destructive'}
                                >End Game</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <p className="text-lg font-semibold">{game.code}</p>
                    {game.ended ? (
                        <Button
                            className="cursor-pointer"
                            onClick={handleNewGame}
                        >
                            <FlagIcon />
                            New Game
                        </Button>
                    ) : !game.started ? (
                        <Button
                        className="cursor-pointer"
                        onClick={handleStartGame}
                        >
                            <FlagIcon />
                            Start Game
                        </Button>
                    ) : game.voting ? (
                        <Button
                            className="cursor-pointer"
                            onClick={handleRevealVotes}
                        >
                            <FlagIcon />
                            Reveal Votes
                        </Button>
                    ) : !isLastQuestion ? (
                        <Button
                        className="cursor-pointer"
                        onClick={handleNextQuestion}
                        >
                            <FlagIcon />
                            Next Question
                        </Button>
                    ) : (
                        <Button
                        className="cursor-pointer"
                        onClick={handleEndGame}
                        >
                            <BookmarkCheckIcon />
                            End Game
                        </Button>
                    )}
                </header>
                {game.started && game.voting && (
                    <div className="h-4 w-full p-3">
                       <div 
                            className="h-4 bg-primary rounded-full transition-all duration-50"
                            style={{ width: timePercent }}
                        ></div>
                    </div>
                )}
            </div>

            {!game.started ? (
                <div className="p-5 space-y-10">
                    <Card className="flex-1 max-w-md mx-auto">
                        <CardHeader className="text-center">
                            <CardDescription>Join Code</CardDescription>
                            <CardTitle className="font-bold text-6xl">{game.code}</CardTitle>
                        </CardHeader>
                    </Card>


                    <div className="flex gap-4 flex-wrap justify-center mt-10">
                        {game.players && game.players.map(player => (
                            <DropdownMenu
                                key={player.userId}
                            >
                                <DropdownMenuTrigger asChild>
                                    <Button className="cursor-pointer chpx-3 py-4" variant={'outline'}>
                                        <Player 
                                            gameId={game._id}
                                            userId={player.userId}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    </DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => handleRemovePlayer(player.userId)}
                                        variant={"destructive"}
                                        className="cursor-pointer"
                                    >
                                        <XIcon />
                                        Remove Player
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div>

                </div>
            ) : (
                !game.ended ? (
                    <div className="p-5 space-y-10">
                        <div className="mx-auto text-center space-y-3">
                            <Badge variant={'secondary'}>Question {(game.questionIndex ?? 0) + 1} / {game?.questions?.length ?? 0}</Badge>
                            <h1 className="text-center text-4xl md:text-5xl font-bold">Would You Rather...</h1>
                            <p>{totalVotes} / {game.players?.length} votes</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <Card
                                className={`
                                    w-full rounded-3xl text-xl font-semibold
                                    transition-all duration-200
                                    shadow-lg
                                    hover:scale-105
                                    active:scale-95
                                `}
                            >
                                <CardHeader className="text-center p-10">
                                    {!game.voting && (
                                        <CardTitle className="text-2xl">
                                            {Math.round((votesA / totalVotes) * 100)}%
                                        </CardTitle>
                                    )}
                                    <CardTitle>{game.questions?.[game.questionIndex ?? 0]?.optionA}</CardTitle>
                                </CardHeader>
                                {!game.voting && (
                                    <CardFooter className="flex-1 grid grid-cols-2 gap-4 items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {question?.votesA?.map((userId) => (
                                                <Badge key={userId} variant="secondary" className="px-2 py-1">
                                                    <Player 
                                                        gameId={game._id}
                                                        userId={userId}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex justify-end">
                                            <Badge variant="outline" className="text-sm">
                                                {question?.votesA?.length ?? 0} votes
                                            </Badge>
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                            <Card
                                className={`
                                    w-full rounded-3xl text-xl font-semibold
                                    transition-all duration-200
                                    shadow-lg
                                    hover:scale-105
                                    active:scale-95
                                `}
                            >
                                <CardHeader className="text-center p-10">
                                    {!game.voting && (
                                        <CardTitle className="text-2xl">
                                           {Math.round((votesB / totalVotes) * 100)}%
                                        </CardTitle>
                                    )}
                                    <CardTitle>{game.questions?.[game.questionIndex ?? 0]?.optionB}</CardTitle>
                                </CardHeader>
                                {!game.voting && (
                                    <CardFooter className="flex-1 grid grid-cols-2 gap-4 items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {question?.votesB?.map((userId) => (
                                                <Badge key={userId} variant="secondary" className="px-2 py-1">
                                                    <Player 
                                                        gameId={game._id}
                                                        userId={userId} 
                                                    />
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex justify-end">
                                            <Badge variant="outline" className="text-sm">
                                                {question?.votesB?.length ?? 0} votes
                                            </Badge>
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        </div>

                    </div>
                ) : (
                    <div className="p-5 space-y-10">
                        <div className="mx-auto text-center space-y-3">
                            <Badge variant={'secondary'}>Game Ended</Badge>
                            <h1 className="text-center text-4xl md:text-5xl font-bold">Would You Rather...</h1>
                            <p>Results</p>
                        </div>
                        <div className="space-y-20 max-w-2xl mx-auto">
                            {game.questions?.map((question, index) => (
                                <div className="space-y-4">
                                    <p className="text-center text-xl">Question {index + 1}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card
                                            className={`
                                                w-full rounded-3xl text-xl font-semibold
                                                transition-all duration-200
                                                shadow-lg
                                                hover:scale-105
                                                active:scale-95
                                            `}
                                        >
                                            <CardHeader className="text-center p-10">
                                                <CardTitle>{question.optionA}</CardTitle>
                                            </CardHeader>
                                            <CardFooter className="flex-1 grid grid-cols-2 gap-4 items-start">
                                                <div className="flex flex-wrap gap-2">
                                                    {question?.votesA?.map((userId) => (
                                                        <Badge key={userId} variant="secondary" className="px-2 py-1">
                                                            <Player 
                                                                gameId={game._id}
                                                                userId={userId} 
                                                            />
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex justify-end">
                                                    <Badge variant="outline" className="text-sm">
                                                        {question?.votesA?.length ?? 0} votes
                                                    </Badge>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                        <Card
                                            className={`
                                                w-full rounded-3xl text-xl font-semibold
                                                transition-all duration-200
                                                shadow-lg
                                                hover:scale-105
                                                active:scale-95
                                            `}
                                        >
                                            <CardHeader className="text-center p-10">
                                                <CardTitle>{question.optionB}</CardTitle>
                                            </CardHeader>
                                            <CardFooter className="flex-1 grid grid-cols-2 gap-4 items-start">
                                                <div className="flex flex-wrap gap-2">
                                                    {question?.votesB?.map((userId) => (
                                                        <Badge key={userId} variant="secondary" className="px-2 py-1">
                                                            <Player 
                                                                gameId={game._id}
                                                                userId={userId} 
                                                            />
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex justify-end">
                                                    <Badge variant="outline" className="text-sm">
                                                        {question?.votesB?.length ?? 0} votes
                                                    </Badge>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

        </main>
    )
}