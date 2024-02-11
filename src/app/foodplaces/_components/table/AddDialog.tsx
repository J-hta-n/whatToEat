"use client";

import { Button, Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import FoodPlaceForm from "../form/FoodPlaceForm";

const AddDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger>
          <Button onClick={() => setIsDialogOpen(true)}>Add new place</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Add new place</Dialog.Title>
          <FoodPlaceForm setIsDialogOpen={setIsDialogOpen} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddDialog;
