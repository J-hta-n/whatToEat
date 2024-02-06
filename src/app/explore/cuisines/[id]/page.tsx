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
  // const foodPlaceIds = await database.foodPlaceByCuisine.findMany({
  //   where: { place_id: params.id },
  // });
  // const foodPlaces = await database.foodPlace.findMany({
  //   where: { id: { in: foodPlaceIds } },
  // });

  // TODO: Return all food places here in a nice list without too much details;
  // ain' gonna implement filter, sort, or pagination here, so keep it short and simple

  return (
    <SubPage backHref="/explore/cuisines">
      <SimpleList items={null} />
    </SubPage>
  );
};

export default FoodPlacesByCuisinePage;
