import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";
import { Dish, FoodPlace } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import AddFoodPlaceSearchBar from "../../_components/AddFoodPlaceSearchBar";
import { Toaster } from "react-hot-toast";

interface Props {
  params: Promise<{ id: string }>;
}

const FoodPlacesByDishPage = async ({ params }: Props) => {
  const routeParams = await params;
  const allFoodPlaces = await database.foodPlace.findMany();
  const foodPlaceIds = await database.foodPlaceByDish
    .findMany({
      where: { dish_id: parseInt(routeParams.id) },
      orderBy: { created_at: "asc" },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const includedFoodPlaces = foodPlaceIds.map(
    (id) => allFoodPlaces[id - 1] // Works because place_id = array_id + 1
  );
  const excludedFoodPlaces = allFoodPlaces.filter(
    (place: FoodPlace) => !foodPlaceIds.includes(place.id)
  );

  const dish: Dish | null = await database.dish.findUnique({
    where: { id: parseInt(routeParams.id) },
  });

  return (
    <SubPage backHref="/explore/dishes" title="Dishes">
      <Toaster />
      <Flex gap="5" justify="end" className="mr-20">
        <AddFoodPlaceSearchBar
          excludedFoodPlaces={excludedFoodPlaces}
          exploreId={dish!["id"]}
          junctionTable="foodplacesbydish"
        />
      </Flex>
      <SimpleList
        items={includedFoodPlaces}
        title={dish!["name"]}
        exploreId={dish!["id"]}
        junctionTable="foodplacesbydish"
      />
    </SubPage>
  );
};

export default FoodPlacesByDishPage;
