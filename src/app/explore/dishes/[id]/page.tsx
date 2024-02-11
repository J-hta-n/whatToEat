import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";

interface Props {
  params: {
    id: string;
  };
}

const FoodPlacesByDishPage = async ({ params }: Props) => {
  // TODO: GET all fp_ids from FoodPlaceByDish where cuisine_id = id, then
  // GET all food places with these ids
  const foodPlaceIds = await database.foodPlaceByDish
    .findMany({
      where: { dish_id: parseInt(params.id) },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const foodPlaces = await database.foodPlace.findMany({
    where: { id: { in: foodPlaceIds } },
  });
  const dish = await database.dish
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .then((res) => res?.name);

  // TODO: Return all food places here in a nice list without too much details;
  // ain' gonna implement filter, sort, or pagination here, so keep it short and simple

  return (
    <SubPage backHref="/explore/dishes" title="Dishes">
      <SimpleList items={foodPlaces} name={dish!} />
    </SubPage>
  );
};

export default FoodPlacesByDishPage;
