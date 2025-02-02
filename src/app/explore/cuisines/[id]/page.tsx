import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";
import { Flex } from "@radix-ui/themes";
import AddFoodPlaceSearchBar from "../../_components/AddFoodPlaceSearchBar";
import { FoodPlace, Cuisine } from "@prisma/client";
import { Toaster } from "react-hot-toast";

interface Props {
  params: Promise<{ id: string }>;
}

const FoodPlacesByCuisinePage = async ({ params }: Props) => {
  const routeParams = await params;
  // https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
  // Data is fetched for SSR components first before being returned to the client
  const allFoodPlaces = await database.foodPlace.findMany();
  const foodPlaceIds = await database.foodPlaceByCuisine
    .findMany({
      where: { cuisine_id: parseInt(routeParams.id) },
      orderBy: { created_at: "asc" },
    })
    .then((rows) => rows.map((row) => row.place_id));
  // IMPT NOTE: DO NOT USE foodPlaceIds.map((id) => allFoodPlaces[id-1]) as place_id is NOT necessarily = array_id + 1
  // Also, foodPlaceIds is mapped to food places instead of filtering allFoodPlaces, as foodPlaceIds is already sorted by created_at
  const includedFoodPlaces = foodPlaceIds.map(
    (id) => allFoodPlaces.find((place) => place.id === id)! // ! is used to assert that it won't be undefined
  );
  const excludedFoodPlaces = allFoodPlaces.filter(
    (place: FoodPlace) => !foodPlaceIds.includes(place.id)
  );

  const cuisine: Cuisine | null = await database.cuisine.findUnique({
    where: { id: parseInt(routeParams.id) },
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
