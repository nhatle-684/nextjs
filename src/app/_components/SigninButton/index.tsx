"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SigninButton() {
  const [callbackUrl, setCallbackUrl] = useState("/");
  useEffect(() => {
    setCallbackUrl(window.location.href);
  }, []);
  return (
    <Button
      onClick={() =>
        signIn("stackup", {
          callbackUrl: callbackUrl,
        })
      }
    >
      Sign in
    </Button>
  );
}
