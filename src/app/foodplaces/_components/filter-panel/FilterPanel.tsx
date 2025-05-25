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
    <div className="flex justify-between items-center flex-nowrap m-5 gap-0 md:gap-5">
      {/* Left side — no wrapping, no shrinking */}
      <div className="flex-shrink-0">
        <AddNewFoodPlaceDialog explorePageContext={explorePageContext} />
      </div>

      {/* Right side — allow wrapping, align right */}
      <div className="flex flex-wrap justify-end gap-5 max-w-[70%]">
        <div className="min-w-32 text-sm">
          <FilterSelect<PlaceType>
            searchParams={searchParams}
            enumKey="place_type"
          />
        </div>
        <div className="min-w-32 text-sm">
          <FilterSelect<Region> searchParams={searchParams} enumKey="region" />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
