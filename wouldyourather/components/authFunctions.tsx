"use client"

import { useAuthActions } from "@convex-dev/auth/react";

const { signOut } = useAuthActions();

export const handleSignOut = async () => {
    await signOut();
}