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
      href: "/foodplaces",
      page: "Food Places",
    },
  ];
  return (
    <div>
      {navBarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`mx-5 ${
            activeHref === link.href ? "text-orange-600" : "text-emerald-500"
          }  hover:text-emerald-700`}
        >
          {link.page}
        </Link>
      ))}
    </div>
  );
};

export default NavBarLinks;
