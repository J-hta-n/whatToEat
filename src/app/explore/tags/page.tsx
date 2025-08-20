"use client";

import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import AddTagDialog from "./_components/AddTagDialog";
import EditTagDialog from "./_components/EditTagDialog";
import { Toaster } from "react-hot-toast";
import DeleteDialog from "../_components/DeleteDialog";
import useSWR from "swr";
import { Tag } from "@prisma/client";
import SpinnerLoading from "../_components/SpinnerLoading";

const TagsPage = () => {
  const { data: tags, isLoading } = useSWR<Tag[]>("/api/tags", (url: string) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <SubPage backHref="/explore" title="Tags" addDialog={<AddTagDialog />}>
      <Toaster />
      {isLoading ? (
        <SpinnerLoading />
      ) : tags?.length === 0 ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Text size="3" weight="medium" color="gray">
            No custom tags yet — add one to get started!
          </Text>
        </Flex>
      ) : (
        <Flex gap="3" align="center" wrap="wrap">
          {tags?.map((tag) => (
            <Card
              key={tag.id}
              variant="classic"
              style={{
                maxWidth: 250,
                backgroundColor: "azure",
              }}
            >
              <Flex gap="1" align="center">
                <Link
                  href={`/explore/tags/${tag.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{tag.tag}</Text>
                </Link>
                <EditTagDialog tag={tag} />
                <DeleteDialog
                  apiUrl={`/api/tags/${tag.id}`}
                  entryName={tag.tag}
                  refetchUrl={"/api/tags"}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </SubPage>
  );
};

export default TagsPage;
