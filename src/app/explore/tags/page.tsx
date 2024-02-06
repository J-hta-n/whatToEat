import database from "@/prisma";
import React from "react";

const TagsPage = async () => {
  // TODO: GET all tags and load them
  const tags = await database.tag.findMany();
  // Since tags are custom, allow the user to edit, add, or delete them.
  // For edit, currently attached foodplaces stay the same since the id's don't change.
  // For delete, simply remove the entries in the junction table first with the tag id,
  // then remove the tag.
  // Here, we would to make an api call for that
  const addTag = async () => {
    // make the api POST here
  };
  const editTag = async () => {
    // make the api PATCH here
  };
  const deleteTag = async () => {
    // make the api DELETE here
  };

  // TODO: Display the tags in card form
  return <div>TagsPage</div>;
};

export default TagsPage;
