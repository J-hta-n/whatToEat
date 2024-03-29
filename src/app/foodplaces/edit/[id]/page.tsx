import database from "@/prisma";
import React from "react";
import FoodPlaceForm from "../../_components/form/FoodPlaceForm";

interface Props {
  params: {
    id: string;
  };
}

const EditFoodPlaceForm = async ({ params }: Props) => {
  const foodPlace = await database.foodPlace.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return <FoodPlaceForm existingFoodPlace={foodPlace || undefined} />;
};

export default EditFoodPlaceForm;
