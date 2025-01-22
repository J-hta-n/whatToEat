import database from "@/prisma";
import React from "react";
import FoodPlaceForm from "../../_components/form/FoodPlaceForm";
import { Strong } from "@radix-ui/themes";

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

  return (
    <div className="justify-items-center">
      <Strong>Edit Food Place</Strong>

      <div className="w-1/2 mt-5">
        <FoodPlaceForm existingFoodPlace={foodPlace || undefined} />
      </div>
    </div>
  );
};

export default EditFoodPlaceForm;
