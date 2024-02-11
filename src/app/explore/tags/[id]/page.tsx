import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";

interface Props {
  params: {
    id: string;
  };
}

const FoodPlacesByTagPage = async ({ params }: Props) => {
  // TODO: GET all fp_ids from FoodPlaceByCuisine where cuisine_id = id, then
  // GET all food places with these ids
  const foodPlaceIds = await database.foodPlaceByTag
    .findMany({
      where: { tag_id: parseInt(params.id) },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const foodPlaces = await database.foodPlace.findMany({
    where: { id: { in: foodPlaceIds } },
  });
  const tag = await database.tag
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .then((res) => res?.tag);

  // TODO: Return all food places here in a nice list without too much details;
  // ain' gonna implement filter, sort, or pagination here, so keep it short and simple

  return (
    <SubPage backHref="/explore/tags" title="Tags">
      <SimpleList items={foodPlaces} name={tag!} />
    </SubPage>
  );
};

export default FoodPlacesByTagPage;
