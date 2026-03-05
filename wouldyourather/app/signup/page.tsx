"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";

export default function Page() {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="flex h-screen items-center justify-center">
            <div className="w-full max-w-[400px]">
                <Card className="">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>Login with you email and password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input 
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        
                                    />
                                </Field>
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                    </div>
                                    <InputGroup>
                                    
                                        <InputGroupInput
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />    
                                        <InputGroupAddon align={'inline-end'}>
                                            <Button>
                                                <EyeOffIcon />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field>
                                    <Button type="submit" onClick={() => signIn("password", { email, password, flow: "signUp" })}>Sign Up</Button>
                                    <FieldDescription className="text-center">
                                        Already have an account? <a href="/login">Log in</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}