import database from "@/prisma";
import React from "react";
import SubPage from "../../_components/SubPage";
import SimpleList from "../../_components/SimpleList";
import { Flex } from "@radix-ui/themes";
import AddFoodPlaceSearchBar from "../../_components/AddFoodPlaceSearchBar";
import { FoodPlace, Tag } from "@prisma/client";
import { Toaster } from "react-hot-toast";

interface Props {
  params: Promise<{ id: string }>;
}

const FoodPlacesByTagPage = async ({ params }: Props) => {
  const routeParams = await params;
  const allFoodPlaces = await database.foodPlace.findMany();
  const foodPlaceIds = await database.foodPlaceByTag
    .findMany({
      where: { tag_id: parseInt(routeParams.id) },
      orderBy: { created_at: "asc" },
    })
    .then((rows) => rows.map((row) => row.place_id));
  const includedFoodPlaces = foodPlaceIds.map(
    (id) => allFoodPlaces.find((place) => place.id === id)! // ! is used to assert that it won't be undefined
  );
  const excludedFoodPlaces = allFoodPlaces.filter(
    (place: FoodPlace) => !foodPlaceIds.includes(place.id)
  );

  const tag: Tag | null = await database.tag.findUnique({
    where: { id: parseInt(routeParams.id) },
  });

  return (
    <SubPage backHref="/explore/tags" title="Tags">
      <Toaster />
      <Flex gap="5" justify="end" className="mr-20">
        <AddFoodPlaceSearchBar
          excludedFoodPlaces={excludedFoodPlaces}
          exploreId={tag!["id"]}
          junctionTable="foodplacesbytag"
        />
      </Flex>
      <SimpleList
        items={includedFoodPlaces}
        title={tag!["tag"]}
        exploreId={tag!["id"]}
        junctionTable="foodplacesbytag"
      />
    </SubPage>
  );
};

export default FoodPlacesByTagPage;
