import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

export const config = {
  providers: [Google, Discord],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
