import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import NavBar from "../components/layout/NavBar";
import "./globals.css";
import MuiProvider from "../components/providers/MuiProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What To Eat?",
  description: "Get ideas for your next meal",
  verification: {
    google: "WDd7we_BmeXEqor8oG29xY5Qd1Fq8LX18-oMTQcOCb0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <MuiProvider>
            <Theme>
              <NavBar />
              <div className="p-5">{children}</div>
            </Theme>
          </MuiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
