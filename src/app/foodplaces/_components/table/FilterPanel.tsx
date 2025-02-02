import React from "react";
import { FoodQuery } from "../../page";
import { Flex } from "@radix-ui/themes";
import FilterSelect from "./FilterSelect";
import { Cuisine, Dish, PlaceType, Region, Tag } from "@prisma/client";
import AddNewFoodPlaceDialog from "./AddNewFoodPlaceDialog";
import database from "@/prisma";

interface Props {
  searchParams: FoodQuery;
}

const FilterPanel = async ({ searchParams }: Props) => {
  const cuisines: Cuisine[] = await database.cuisine.findMany();
  const dishes: Dish[] = await database.dish.findMany();
  const tags: Tag[] = await database.tag.findMany();
  const explorePageContext = {
    cuisines: cuisines,
    dishes: dishes,
    tags: tags,
  };

  return (
    <Flex gap="5" className="m-5" align="center">
      <div className="mr-32">
        <AddNewFoodPlaceDialog explorePageContext={explorePageContext} />
      </div>
      <div className="w-1/5">
        <FilterSelect<PlaceType>
          searchParams={searchParams}
          enumKey="place_type"
        />
      </div>
      <div className="w-1/5">
        <FilterSelect<Region> searchParams={searchParams} enumKey="region" />
      </div>
    </Flex>
  );
};

export default FilterPanel;
