import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const getOidcConfig = async () => {
  const res = await fetch(
    `${process.env.STACKUP_HOST}/.well-known/openid-configuration`
  );
  return await res.json();
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
