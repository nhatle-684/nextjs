"use client";

import { signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OidcSignout() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === "authenticated" &&
      process.env.NEXT_PUBLIC_STACKUP_HOST === searchParams.get("iss") &&
      session?.sid === searchParams.get("sid")
    ) {
      signOut({ redirect: false });
    }
  }, [status, session, searchParams]);
}
