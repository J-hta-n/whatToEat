"use client";

import { Button, Dialog } from "@radix-ui/themes";
import FoodPlaceForm from "./form/FoodPlaceForm";

const AddFoodPlaceDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add new place</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>New food place</Dialog.Title>
        <FoodPlaceForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddFoodPlaceDialog;
