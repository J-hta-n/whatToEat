import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";

interface Props {
  params: {
    id: string;
  };
}

const FoodPlacesByCuisinePage = async ({ params }: Props) => {
  // TODO: GET all fp_ids from FoodPlaceByCuisine where cuisine_id = id, then
  // GET all food places with these ids
  const foodPlaceIds = await database.foodPlaceByCuisine
    .findMany({
      where: { cuisine_id: parseInt(params.id) },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const foodPlaces = await database.foodPlace.findMany({
    where: { id: { in: foodPlaceIds } },
  });
  const cuisine = await database.cuisine
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .then((res) => res?.cuisine);

  // TODO: Return all food places here in a nice list without too much details;
  // ain' gonna implement filter, sort, or pagination here, so keep it short and simple

  return (
    <SubPage backHref="/explore/cuisines" title="Cuisines">
      <SimpleList items={foodPlaces} name={cuisine!} />
    </SubPage>
  );
};

export default FoodPlacesByCuisinePage;
