"use client";

import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import LoginPage from "./LoginPage";

// import { useConvexAuth } from "convex/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isAuthenticated, isLoading } = useConvexAuth();
//   const router = useRouter();

//   console.log(isAuthenticated)

//   useEffect(() => {
//     if (isLoading) return;

//     if (!isAuthenticated) {
//       router.replace("/login");
//     } else {
//         return;
//     }
//   }, [isAuthenticated, isLoading, router]);

//   return <div>{children}</div>;
// }

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <LoginPage />
      </Unauthenticated>
    </>
  )
}