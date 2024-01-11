import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <h1>Hello, Dashboard Page!</h1>
      <Link href="/dashboard/settings">Settings</Link>
    </>
  );
}
