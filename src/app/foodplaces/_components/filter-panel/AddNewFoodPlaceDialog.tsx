"use client";

import { Button, Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import FoodPlaceForm from "../form/FoodPlaceForm";
import { Cuisine, Dish, Tag } from "@prisma/client";

interface Props {
  explorePageContext: {
    cuisines: Cuisine[];
    dishes: Dish[];
    tags: Tag[];
  };
}

const AddNewFoodPlaceDialog = ({ explorePageContext }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger>
          <Button size="3" onClick={() => setIsDialogOpen(true)}>
            Add
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="h-5/6 overflow-scroll">
          <Dialog.Title className="pb-2 text-center">
            Add new place
          </Dialog.Title>
          <FoodPlaceForm
            setIsDialogOpen={setIsDialogOpen}
            explorePageContext={explorePageContext}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddNewFoodPlaceDialog;
