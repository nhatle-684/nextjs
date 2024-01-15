import SignoutButton from "@/app/_components/SignoutButton";
import { getOidcConfig } from "@/lib/auth/services";

export default async function SignOut() {
  const { end_session_endpoint } = await getOidcConfig();
  return (
    <SignoutButton end_session_endpoint={end_session_endpoint}></SignoutButton>
  );
}
