"use client";

// Credits: Pagination design taken from Code with Mosh's NextJS course (issue tracker)
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  curPage: number;
  totalPages: number;
}

const Pagination = ({ curPage, totalPages }: Props) => {
  if (curPage < 1 || curPage > totalPages) return null;
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <>
      {totalPages > 1 && (
        <Flex align="center" gap="3" p="1" m="1">
          <IconButton
            variant="ghost"
            disabled={curPage === 1}
            onClick={() => goToPage(1)}
          >
            <MdKeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            variant="ghost"
            disabled={curPage === 1}
            onClick={() => goToPage(curPage - 1)}
          >
            <MdChevronLeft />
          </IconButton>
          <Text size="2">
            Page {curPage} out of {totalPages}
          </Text>
          <IconButton
            variant="ghost"
            disabled={curPage === totalPages}
            onClick={() => goToPage(curPage + 1)}
          >
            <MdChevronRight />
          </IconButton>
          <IconButton
            variant="ghost"
            disabled={curPage === totalPages}
            onClick={() => goToPage(totalPages)}
          >
            <MdKeyboardDoubleArrowRight />
          </IconButton>
        </Flex>
      )}
    </>
  );
};

export default Pagination;
