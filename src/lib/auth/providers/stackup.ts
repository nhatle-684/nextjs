import { OAuthConfig } from "next-auth/providers/oauth";

export interface StackupProfile {
  sub: string;
  name: string;
  email: string;
  username: string;
}

export type OAuthProviderOptions = Pick<
  OAuthConfig<StackupProfile>,
  "clientId" | "clientSecret" | "wellKnown"
>;

export default function Stackup(
  options: OAuthProviderOptions
): OAuthConfig<StackupProfile> {
  return {
    id: "stackup",
    name: "Stackup",
    type: "oauth",
    authorization: {
      params: {
        response_mode: "query",
        scope: "openid email profile offline_access",
        prompt: "consent",
      },
    },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile: StackupProfile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        username: profile.username,
      };
    },
    ...options,
  };
}
