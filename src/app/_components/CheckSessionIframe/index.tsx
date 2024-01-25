"use client";

import { useSession } from "next-auth/react";
import { getOidcConfig } from "@/lib/auth/services";
import { useEffect, useState } from "react";

function check_session(
  opFrameId: string,
  message: string,
  targetOrigin: string
) {
  var win = window.frames[opFrameId].contentWindow;
  win.postMessage(message, targetOrigin);
}

function receiveMessage(
  e: MessageEvent,
  timerId: ReturnType<typeof setInterval>,
  onChanged: Function
): void {
  if (e.origin !== process.env.NEXT_PUBLIC_STACKUP_HOST) {
    return;
  }
  const stat = e.data;

  if (stat === "changed") {
    clearInterval(timerId);
    onChanged();
  }
}

export default function Component({ onChanged }: { onChanged: Function }) {
  const { data: session, status } = useSession();
  const opFrameId = "op";
  const [checkSessionIframe, setCheckSessionIframe] = useState("");

  useEffect(() => {
    getOidcConfig().then(({ check_session_iframe }) => {
      setCheckSessionIframe(check_session_iframe);
    });
  }, []);

  useEffect(() => {
    if (status === "authenticated" && checkSessionIframe) {
      const session_polling = setInterval(() => {
        var message =
          process.env.NEXT_PUBLIC_STACKUP_ID + " " + session?.session_state;
        check_session(opFrameId, message, process.env.NEXT_PUBLIC_STACKUP_HOST);
      }, 5000);

      window.addEventListener(
        "message",
        (event) => receiveMessage(event, session_polling, onChanged),
        false
      );

      return () => clearInterval(session_polling);
    }
  }, [status, checkSessionIframe, session, onChanged]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <iframe
      id={opFrameId}
      src={checkSessionIframe}
      width="0"
      height="0"
    ></iframe>
  );
}
