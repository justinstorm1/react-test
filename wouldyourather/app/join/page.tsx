"use client"

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const joinFromCode = useMutation(api.games.joinGameFromCode);

    const handleJoinGame = async () => {
        try {
            const gameId = await joinFromCode({ code });
            router.push(`/game/${gameId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Join Game</h1>
            <p className="text-sm text-muted-foreground mb-3">Enter the game code to join!</p>
            <Field orientation={'horizontal'} className="max-w-[300]">
                <Input 
                    placeholder="Enter Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                />
                <Button 
                    disabled={code.length !== 6} 
                    className="cursor-pointer" 
                    variant={'default'}
                    onClick={handleJoinGame}
                >
                    <CheckIcon />
                    Join
                </Button>
            </Field>
        </main>
    )
}