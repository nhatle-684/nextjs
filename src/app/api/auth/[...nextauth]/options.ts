import Stackup from "@/lib/auth/providers/stackup";
import type { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

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
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else {
        const origin = new URL(url).origin;
        if (origin === baseUrl || origin == process.env.STACKUP_HOST)
          return url;
      }

      return baseUrl;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.idToken) {
        session.idToken = token.idToken;
        session.sid = jwtDecode<{ sid: string }>(token.idToken).sid;
      }

      return session;
    },
  },
};
