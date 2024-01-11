import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript, DarkThemeToggle, Flowbite } from "flowbite-react";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Flowbite>{children}</Flowbite>
        </AuthProvider>
      </body>
    </html>
  );
}
