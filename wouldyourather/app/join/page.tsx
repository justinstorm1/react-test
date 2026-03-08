"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const joinFromCode = useMutation(api.games.joinGameFromCode);
    const game = useMutation(api.games.getGameFromCode);
    const [step, setStep] = useState<"code" | "name">("code");
    const [name, setName] = useState("");
    const [noGame, setNoGame] = useState(false);

    const handleJoinGame = async () => {
        try {
            const gameId = await joinFromCode({ code, name: name.trim() });
            router.push(`/game/${gameId}`);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCheckGame = async () => {
        try {
            const gameId = await game({ code });
            if (gameId) {
                setStep("name");
            } else {
                setNoGame(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            {step === "code" ? (
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Join Game</h1>
                    <p className="text-sm text-muted-foreground mb-3">Enter the game code to join!</p>
                    <Field orientation={'horizontal'} className="max-w-[300]">
                        <Field data-invalid={noGame} orientation={'vertical'}>
                            <Input 
                                placeholder="Enter Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                maxLength={6}
                                id="game-code"
                                aria-invalid={noGame}
                            />
                            {noGame && (
                                <FieldLabel htmlFor="game-code" className="text-center">Invalid Game Code</FieldLabel>
                            )}
                        </Field>
                        <Button 
                            disabled={code.length !== 6} 
                            className="cursor-pointer self-start" 
                            variant={'default'}
                            onClick={handleCheckGame}
                        >
                            <CheckIcon />
                            Join
                        </Button>
                    </Field>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Join Game</h1>
                    <p className="text-sm text-muted-foreground mb-3">Enter your name for the game!</p>
                    <Field orientation={'horizontal'} className="max-w-[300]">
                        <Input 
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button 
                            disabled={name.length < 1} 
                            className="cursor-pointer" 
                            variant={'default'}
                            onClick={handleJoinGame}
                        >
                            <CheckIcon />
                            Join
                        </Button>
                    </Field>
                </div>
            )}
        </main>
    )
}