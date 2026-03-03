import { ComponentExample } from "@/components/component-example";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "lucide-react";

export default function Page() {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Join Game</h1>
            <p className="text-sm text-muted-foreground mb-3">Enter the game code to join!</p>
            <Field orientation={'horizontal'} className="max-w-[300]">
                <Input 
                    placeholder="Enter Code"
                />
                <Button variant={'default'}>
                    <CheckIcon />
                    Join
                </Button>
            </Field>
        </main>
    )
}