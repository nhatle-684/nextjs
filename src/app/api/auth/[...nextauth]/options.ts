import Stackup from "@/lib/auth/providers/stackup";
import type { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    Stackup({
      clientId: process.env.STACKUP_ID,
      clientSecret: process.env.STACKUP_SECRET,
      wellKnown: `${process.env.STACKUP_HOST}/.well-known/openid-configuration`,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("token");
        console.log(token);
        console.log("account");
        console.log(account);
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
