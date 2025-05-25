"use client";

import { dishSchema } from "@/validationSchemas";
import { Dish } from "@prisma/client";
import { TextField } from "@radix-ui/themes";
import { EditDialog } from "../../_components/EditDialog";

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
            {...register("name")}
            placeholder="Name of dish"
            defaultValue={dish.name}
          />
          {errors["name"] && (
            <p className="m-0 p-0 text-red-500">{errors["name"]?.message}</p>
          )}
        </>
      )}
      successMessage="Dish edited successfully"
    />
  );
};

export default EditDishDialog;
