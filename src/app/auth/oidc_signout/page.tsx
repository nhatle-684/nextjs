"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function OidcSignout() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/" });
  });
}
