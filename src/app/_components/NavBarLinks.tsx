"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBarLinks = () => {
  const activeHref = usePathname();
  const navBarLinks = [
    {
      href: "/",
      page: "Home",
    },
    {
      href: "/choose",
      page: "Choose",
    },
    {
      href: "/foodlist",
      page: "Foodlist",
    },
  ];
  return (
    <div>
      {navBarLinks.map((link) => (
        <Link
          href={link.href}
          className="mx-5 text-emerald-500 hover:text-emerald-900"
        >
          {link.page}
        </Link>
      ))}
    </div>
  );
};

export default NavBarLinks;
