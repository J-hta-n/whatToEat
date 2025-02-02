import database from "@/prisma";
import React from "react";
import FoodPlaceForm from "../../_components/form/FoodPlaceForm";
import { Strong } from "@radix-ui/themes";
import { Cuisine, Dish, Tag } from "@prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

const EditFoodPlaceForm = async ({ params }: Props) => {
  const routeParams = await params;

  const foodPlace = await database.foodPlace.findUnique({
    where: {
      id: parseInt(routeParams.id),
    },
  });
  const cuisines: Cuisine[] = await database.cuisine.findMany();
  const dishes: Dish[] = await database.dish.findMany();
  const tags: Tag[] = await database.tag.findMany();
  const explorePageContext = {
    cuisines: cuisines,
    dishes: dishes,
    tags: tags,
  };

  return (
    <div className="justify-items-center">
      <Strong>Edit Food Place</Strong>

      <div className="w-1/2 mt-5">
        <FoodPlaceForm
          existingFoodPlace={foodPlace || undefined}
          explorePageContext={explorePageContext}
        />
      </div>
    </div>
  );
};

export default EditFoodPlaceForm;
