"use client";

import { Tag } from "@prisma/client";
import { TextField } from "@radix-ui/themes";
import { EditDialog } from "../../_components/EditDialog";
import { tagSchema } from "@/app/api/tags/post.schema";

interface Props {
  tag: Tag;
}

const EditTagDialog = ({ tag }: Props) => {
  return (
    <EditDialog
      title="Edit Tag"
      schema={tagSchema}
      defaultValues={tag}
      apiUrl={`/api/tags/${tag.id}`}
      renderFields={(register, errors) => (
        <>
          <TextField.Input
            {...register("tag")}
            placeholder="Name of tag"
            defaultValue={tag.tag}
          />
          {errors["tag"] && (
            <p className="m-0 p-0 text-red-500">{errors["tag"]?.message}</p>
          )}
        </>
      )}
      successMessage="Tag edited successfully"
    />
  );
};

export default EditTagDialog;
