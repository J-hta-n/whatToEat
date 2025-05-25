"use client";

import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import React, { useState } from "react";
import FoodPlaceForm from "../form/FoodPlaceForm";
import { Cuisine, Dish, Tag } from "@prisma/client";
import { MdCancel } from "react-icons/md";

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
          <Dialog.Title className="pb-2 relative">
            <Flex align="center">
              {/* Invisible spacer on the left to balance the right button */}
              <div style={{ width: 30 }} />

              <p style={{ margin: "0 auto" }}>Add new place</p>

              {/* Close button on right */}
              <IconButton
                radius="full"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close"
              >
                <MdCancel size={25} />
              </IconButton>
            </Flex>
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
