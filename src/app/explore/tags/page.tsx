import database from "@/prisma";
import React from "react";
import SubPage from "../_components/SubPage";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import AddTagDialog from "./_components/AddTagDialog";
import EditTagDialog from "./_components/EditTagDialog";
import { Toaster } from "react-hot-toast";
import DeleteTagDialog from "./_components/DeleteTagDialog";

const TagsPage = async () => {
  // TODO: GET all tags and load them
  const tags = await database.tag.findMany();
  // Since tags are custom, allow the user to edit, add, or delete them.
  // For edit, currently attached foodplaces stay the same since the id's don't change.
  // For delete, simply remove the entries in the junction table first with the tag id,
  // then remove the tag.
  // Here, we would to make an api call for that

  const deleteTag = async () => {
    // make the api DELETE here
  };

  // TODO: Display the tags in card form
  return (
    <SubPage backHref="/explore" title="Tags">
      <Toaster />
      <Flex gap="5" justify="end" className="mr-20">
        <AddTagDialog />
      </Flex>
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
                <DeleteTagDialog tag={tag} />
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </SubPage>
  );
};

export default TagsPage;
