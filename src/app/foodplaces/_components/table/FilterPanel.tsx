import React from "react";
import { FoodQuery } from "../../page";
import { Button, Flex, Link } from "@radix-ui/themes";
import FilterPlaceType from "./FilterPlaceType";
import FilterRegion from "./FilterRegion";

interface Props {
  searchParams: FoodQuery;
}

const FilterPanel = ({ searchParams }: Props) => {
  return (
    <Flex gap="5" className="m-5" align="center">
      <div className="mr-32">
        <Link href="/foodplaces/add">
          <Button>Add new place</Button>
        </Link>
      </div>
      <FilterPlaceType searchParams={searchParams} />
      <FilterRegion searchParams={searchParams} />
    </Flex>
  );
};

export default FilterPanel;
