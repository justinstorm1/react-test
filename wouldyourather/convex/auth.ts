import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
// import Apple from "@auth/core/providers/apple";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub,
    // Apple({
    //   profile: (appleInfo) => {
    //     const name = appleInfo.user ? `${appleInfo.user.name.firstName} ${appleInfo.user.name.lastName}` : undefined;
    //     return {
    //       id: appleInfo.sub,
    //       name: name,
    //       email: appleInfo.email
    //     };
    //   }
    // }), 
    Google,
    Password
  ],
});
