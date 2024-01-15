"use client";

import { oidcSignout } from "@/lib/auth/services";
import { Button } from "flowbite-react";

export interface SignoutButtonProps {
  end_session_endpoint?: string;
}

export default function SignoutButton({
  end_session_endpoint,
}: SignoutButtonProps) {
  return (
    <Button onClick={() => oidcSignout(end_session_endpoint)}>Sign out</Button>
  );
}
