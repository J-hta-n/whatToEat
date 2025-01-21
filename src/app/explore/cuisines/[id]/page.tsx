import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";
import { Flex } from "@radix-ui/themes";
import AddFoodPlaceSearchBar from "../../_components/AddFoodPlaceSearchBar";
import { FoodPlace, Cuisine } from "@prisma/client";
import { Toaster } from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}

const FoodPlacesByCuisinePage = async ({ params }: Props) => {
  const queryParams = await params;
  const allFoodPlaces = await database.foodPlace.findMany();
  const foodPlaceIds = await database.foodPlaceByCuisine
    .findMany({
      where: { cuisine_id: parseInt(queryParams.id) },
      orderBy: { created_at: "asc" },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const includedFoodPlaces = foodPlaceIds.map(
    (id) => allFoodPlaces[id - 1] // Works because place_id = array_id + 1
  );
  const excludedFoodPlaces = allFoodPlaces.filter(
    (place: FoodPlace) => !foodPlaceIds.includes(place.id)
  );

  const cuisine: Cuisine | null = await database.cuisine.findUnique({
    where: { id: parseInt(queryParams.id) },
  });

  return (
    <SubPage backHref="/explore/cuisines" title="cuisines">
      <Toaster />
      <Flex gap="5" justify="end" className="mr-20">
        <AddFoodPlaceSearchBar
          excludedFoodPlaces={excludedFoodPlaces}
          exploreId={cuisine!["id"]}
          junctionTable="foodplacesbycuisine"
        />
      </Flex>
      <SimpleList
        items={includedFoodPlaces}
        title={cuisine!["cuisine"]}
        exploreId={cuisine!["id"]}
        junctionTable="foodplacesbycuisine"
      />
    </SubPage>
  );
};

export default FoodPlacesByCuisinePage;
