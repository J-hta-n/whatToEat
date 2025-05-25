import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import MuiProvider from "./MuiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What To Eat?",
  description: "Get ideas for your next meal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          <Theme>
            <NavBar />
            <div className="p-5">{children}</div>
          </Theme>
        </MuiProvider>
      </body>
    </html>
  );
}
