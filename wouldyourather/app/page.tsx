"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeftFromLine, Codesandbox, KeyIcon, LogIn, LogOut, LogOutIcon, PlusIcon, } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();    
    const { signOut } = useAuthActions();
    const userId = useQuery(api.users.getCurrentUserId);
    const user = useQuery(api.users.getUser, userId ? { userId } : "skip");
    const createGame = useMutation(api.games.createGame);

    const handleCreateGame = async () => {
        const gameId = await createGame();
        router.push(`/create/${gameId}`);
    };

    return (
        <main className="h-screen">
            <header className="flex w-screen items-center border-b p-4 justify-between">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant={'destructive'}>
                            <LogOutIcon className="rotate-180" />
                            Sign Out
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                <ArrowLeftFromLine />
                            </AlertDialogMedia>
                            <AlertDialogTitle>Sign Out?</AlertDialogTitle>
                            <AlertDialogDescription>This action will log you out of your account.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={signOut} variant={'destructive'}>Sign Out</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Badge variant={'secondary'}>
                    {user?.name}
                </Badge>
            </header>
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Host a game?</CardTitle>
                            <CardDescription>Click the button below to create a new game and invite your friends!</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="cursor-pointer" variant={'default'} onClick={async () => await handleCreateGame()}>
                                <PlusIcon />
                                Create Game
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Join a game?</CardTitle>
                            <CardDescription>Click the button below to join a game and play with your friends!</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild variant={'default'}>
                                <a href="/join">
                                    <LogIn />
                                    Join Game
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    )
}