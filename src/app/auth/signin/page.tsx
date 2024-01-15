"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Signin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("stackup", { callbackUrl: callbackUrl });
    }
  }, [status, callbackUrl]);

  return <div></div>;
}
