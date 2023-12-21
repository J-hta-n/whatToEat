import { Flex } from "@radix-ui/themes";
import React from "react";
import NavBarLinks from "./_components/NavBarLinks";

const NavBar = () => {
  return (
    <nav className="p-3 border-b-2">
      <Flex justify="between">
        <NavBarLinks />
      </Flex>
    </nav>
  );
};

export default NavBar;
