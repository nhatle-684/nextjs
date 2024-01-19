import Stackup from "@/lib/auth/providers/stackup";
import type { NextAuthOptions, TokenSet } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { getOidcConfig } from "@/lib/auth/services";
import { JWT } from "next-auth/jwt";

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
      // Initial sign in
      if (account && profile) {
        console.log("account: ", account);
        console.log("token: ", token);
        return {
          ...token,
          idToken: account.id_token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      }

      if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        return token;
      }

      var rs = await refreshAccessToken(token);
      console.log("refresh token rs: ", rs);
      return rs;
    },
    async session({ session, token, user }) {
      if (token?.idToken) {
        session.idToken = token.idToken;
        session.sid = jwtDecode<{ sid: string }>(token.idToken).sid;
      }
      session.error = token.error;
      return session;
    },
  },
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log("refreshAccessToken", token);
  if (!token.expires_at || !token.refreshToken) {
    return token;
  }

  try {
    const oidcConfig = await getOidcConfig();
    const response = await fetch(oidcConfig.token_endpoint, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams([
        ["client_id", process.env.STACKUP_ID],
        ["client_secret", process.env.STACKUP_SECRET],
        ["grant_type", "refresh_token"],
        ["refresh_token", token.refreshToken],
      ]),
      method: "POST",
    });

    const refreshedTokens: TokenSet = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: refreshedTokens.expires_at,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
