"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBarLinks = () => {
  const activeHref = usePathname();
  const rootHref = "/" + activeHref.substring(1).split("/")[0];
  const navBarLinks = [
    {
      href: "/",
      page: "Home",
    },
    {
      href: "/explore",
      page: "Explore",
    },
    // {
    //   href: "/choose",
    //   page: "Choose",
    // },
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
            rootHref === link.href ? "text-orange-600" : "text-emerald-500"
          }  hover:text-emerald-700`}
        >
          {link.page}
        </Link>
      ))}
    </div>
  );
};

export default NavBarLinks;
