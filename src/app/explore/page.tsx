import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ExplorePage = () => {
  return (
    <div>
      <Flex gap="3">
        <Button>
          <Link href="/explore/cuisines"> By cuisines</Link>
        </Button>
        <Button>By locations</Button>
        <Button>By custom tags</Button>
      </Flex>
    </div>
  );
};

export default ExplorePage;
