import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import database from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

/**
 * NextAuth configuration for OAuth providers, database adapters, and session management strategies.
 * Initial strategy was to use JWT which already consisted of basic info like name, email, and provider
 * id, but switched to db sessions in order to store user IDs locally for easier user access management.
 *
 * Currently configured auth flow:
 * 1. User clicks "Sign in with <provider>"
 * 2. App redirects to provider's auth server with required params (client ID, redirect URI, scope, etc.)
 * 3. Provider redirects back with authorization code
 * 4. Auth.js exchanges code for tokens (OIDC token, access token, refresh token etc.)
 * 5. Auth.js calls Provider's userinfo endpoint to obtain name, email, image
 * 6. PrismaAdapter then does the following:
 *   a) Looks for existing Account based on provider and providerAccountId
 *   b) If Account exists:
 *     - Finds associated User
 *     - Creates new Session
 *     - Returns existing user
 *   c) If Account doesn't exist:
 *     - Creates new User record (with cuid())
 *     - Creates new Account record linking to User
 *     - Creates new Session
 *     - Returns new user
 * 7. withUserId middleware gets access to req.auth.user.id (which is the Prisma User.id)
 */
export const config: NextAuthConfig = {
  adapter: PrismaAdapter(database),
  providers: [Google, Discord],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
