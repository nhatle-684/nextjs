"use client";

import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import CheckSessionIframe from "../_components/CheckSessionIframe";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CheckSessionIframe onChanged={signOut}></CheckSessionIframe>
      {children}
    </SessionProvider>
  );
}
