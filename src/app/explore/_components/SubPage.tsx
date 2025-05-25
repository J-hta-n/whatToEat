import { Flex, IconButton, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

interface Props {
  backHref: string;
  children: ReactNode;
  title: string;
  addDialog?: ReactNode;
}

const SubPage = ({ backHref, children, title, addDialog }: Props) => {
  return (
    <Flex direction="column" className="w-full" gap="4">
      {/* Top panel: header row */}
      <Flex
        direction="row"
        align="center"
        justify="between"
        className="relative w-full"
      >
        <Link href={backHref}>
          <IconButton className="w-20" radius="full" variant="ghost">
            <MdArrowBack className="m-2" />
            <Text>Back</Text>
          </IconButton>
        </Link>

        <Strong className="absolute left-1/2 -translate-x-1/2 text-center">
          {title}
        </Strong>

        {addDialog}
      </Flex>

      {/* Children appear on the next row */}
      <Flex direction="column" gap="3">
        {children}
      </Flex>
    </Flex>
  );
};

export default SubPage;
