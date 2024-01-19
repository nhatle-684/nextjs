import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export interface OpenidConfig {
  issuer: string;
  token_endpoint: string;
  scopes_supported: string[];
  response_types_supported: string[];
  response_modes_supported: string[];
  grant_types_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  jwks_uri: string;
  authorization_endpoint: string;
  registration_endpoint: string;
  end_session_endpoint: string;
  frontchannel_logout_supported: boolean;
  frontchannel_logout_session_supported: boolean;
  userinfo_endpoint: string;
  subject_types_supported: string[];
  claims_parameter_supported: boolean;
  id_token_signing_alg_values_supported: string[];
  id_token_encryption_alg_values_supported: string[];
  id_token_encryption_enc_values_supported: string[];
  userinfo_signing_alg_values_supported: string[];
  userinfo_encryption_alg_values_supported: string[];
  userinfo_encryption_enc_values_supported: string[];
  request_object_signing_alg_values_supported: string[];
  request_object_encryption_alg_values_supported: string[];
  request_object_encryption_enc_values_supported: string[];
  claim_types_supported: string[];
  claims_supported: string[];
}

export const getOidcConfig = async () => {
  const res = await fetch(
    `${process.env.STACKUP_HOST}/.well-known/openid-configuration`
  );
  return (await res.json()) as OpenidConfig;
};

export const oidcSignout = async (end_session_endpoint?: string) => {
  let url = "/";
  if (end_session_endpoint) {
    const logout_url = new URL(end_session_endpoint);
    const session = await getSession();
    logout_url.searchParams.set(
      "post_logout_redirect_uri",
      window.location.href
    );
    if (session?.idToken) {
      logout_url.searchParams.set("id_token_hint", session?.idToken);
    }

    url = logout_url.toString();
  }

  signOut({
    callbackUrl: url,
  });
};
