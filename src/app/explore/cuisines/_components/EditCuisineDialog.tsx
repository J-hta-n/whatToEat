"use client";

import { cuisineSchema } from "@/validationSchemas";
import { Cuisine } from "@prisma/client";
import { TextField } from "@radix-ui/themes";
import { EditDialog } from "../../_components/EditDialog";

interface Props {
  cuisine: Cuisine;
}

const EditCuisineDialog = ({ cuisine }: Props) => {
  return (
    <EditDialog
      title="Edit Cuisine"
      schema={cuisineSchema}
      defaultValues={cuisine}
      apiUrl={`/api/cuisines/${cuisine.id}`}
      renderFields={(register, errors) => (
        <>
          <TextField.Input
            {...register("cuisine")}
            placeholder="Name of cuisine"
            defaultValue={cuisine.cuisine}
          />
          {errors["cuisine"] && (
            <p className="m-0 p-0 text-red-500">{errors["cuisine"]?.message}</p>
          )}
        </>
      )}
      successMessage="Cuisine edited successfully"
    />
  );
};

export default EditCuisineDialog;
