import database from "@/prisma";
import React from "react";
import FoodPlaceForm from "../../_components/form/FoodPlaceForm";

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

  return <FoodPlaceForm existingFoodPlace={foodPlace || undefined} />;
};

export default EditFoodPlaceForm;
