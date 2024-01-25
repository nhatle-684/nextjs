import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    idToken?: string;
    sid?: string;
    session_state?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    session_state?: string;
    error?: "RefreshAccessTokenError";
  }
}
