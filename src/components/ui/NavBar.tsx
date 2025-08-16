"use client";

import { Button, Flex } from "@radix-ui/themes";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignInDialog from "@/components/auth/SignIn";
import NavBarLinks from "./NavBarLinks";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className="p-3 border-b-2">
      <Flex justify="between">
        <NavBarLinks />
        {session?.user ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <SignInDialog redirectUri={pathname || ""} />
        )}
      </Flex>
    </nav>
  );
};

export default NavBar;
