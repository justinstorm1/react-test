"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function Player({ userId }: { userId: Id<"users"> }) {
    const user = useQuery(api.users.getUser, { userId });

    return (
        <>
            {user?.name || "Unknown Player"}
        </>
    )
}