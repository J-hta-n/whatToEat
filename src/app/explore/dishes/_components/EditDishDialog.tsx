"use client";

import { Dish } from "@prisma/client";
import { TextField } from "@radix-ui/themes";
import { EditDialog } from "../../_components/EditDialog";
import { dishSchema } from "@/app/api/dishes/post.schema";

interface Props {
  dish: Dish;
}

const EditDishDialog = ({ dish }: Props) => {
  return (
    <EditDialog
      title="Edit Dish"
      schema={dishSchema}
      defaultValues={dish}
      apiUrl={`/api/dishes/${dish.id}`}
      renderFields={(register, errors) => (
        <>
          <TextField.Input
            {...register("dish")}
            placeholder="Name of dish"
            defaultValue={dish.dish}
          />
          {errors["dish"] && (
            <p className="m-0 p-0 text-red-500">{errors["dish"]?.message}</p>
          )}
        </>
      )}
      successMessage="Dish edited successfully"
    />
  );
};

export default EditDishDialog;
