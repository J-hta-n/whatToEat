import { Button, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import React, { PropsWithChildren, ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

interface Props {
  backHref: string;
  children: ReactNode;
}

const SubPage = ({ backHref, children }: Props) => {
  return (
    <Flex direction="column" gap="3">
      <IconButton className="w-12" radius="full" variant="ghost">
        <Link href={backHref}>
          <MdArrowBack />
        </Link>
      </IconButton>
      {children}
    </Flex>
  );
};

export default SubPage;
