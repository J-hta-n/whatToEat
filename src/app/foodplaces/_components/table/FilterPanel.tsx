import React from "react";
import { FoodQuery } from "../../page";
import { Flex } from "@radix-ui/themes";
import FilterSelect from "./FilterSelect";
import { PlaceType, Region } from "@prisma/client";
import AddNewFoodPlaceDialog from "./AddNewFoodPlaceDialog";

interface Props {
  searchParams: FoodQuery;
}

const FilterPanel = ({ searchParams }: Props) => {
  return (
    <Flex gap="5" className="m-5" align="center">
      <div className="mr-32">
        <AddNewFoodPlaceDialog />
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
