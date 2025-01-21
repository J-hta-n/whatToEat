import { Button, Flex, IconButton, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { PropsWithChildren, ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

interface Props {
  backHref: string;
  children: ReactNode;
  title: string;
}

const SubPage = ({ backHref, children, title }: Props) => {
  return (
    <Flex direction="row" gap="3">
      <Link href={backHref}>
        <IconButton className="w-20" radius="full" variant="ghost">
          <MdArrowBack className="m-2" />
          <Text>Back</Text>
        </IconButton>
      </Link>
      <Flex direction="column" gap="3" className="flex-grow">
        <Flex direction="row" gap="3">
          <Strong className="text-center" style={{ flex: 1 }}>
            {title}
          </Strong>
        </Flex>

        {children}
      </Flex>
    </Flex>
  );
};

export default SubPage;
