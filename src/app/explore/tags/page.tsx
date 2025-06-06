export const dynamic = "force-dynamic";

import database from "@/prisma";
import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import AddTagDialog from "./_components/AddTagDialog";
import EditTagDialog from "./_components/EditTagDialog";
import { Toaster } from "react-hot-toast";
import DeleteDialog from "../_components/DeleteDialog";

const TagsPage = async () => {
  const tags = await database.tag.findMany();
  // Since tags are custom, allow the user to edit, add, or delete them.
  // For edit, currently attached foodplaces stay the same since the id's don't change.
  // For delete, simply remove the entries in the junction table first with the tag id,
  // then remove the tag. (delete on cascade)

  return (
    <SubPage backHref="/explore" title="Tags" addDialog={<AddTagDialog />}>
      <Toaster />
      <Flex gap="3" align="center" wrap="wrap">
        {tags.map((tag) => {
          return (
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
                  key={tag.id}
                  href={`/explore/tags/${tag.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{tag.tag}</Text>
                </Link>
                <EditTagDialog tag={tag} />
                <DeleteDialog
                  apiUrl={`/api/tags/${tag.id}`}
                  entryName={tag.tag}
                />
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </SubPage>
  );
};

export default TagsPage;
