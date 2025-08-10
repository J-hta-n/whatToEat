"use client";

import React from "react";
import FilterSelect from "./FilterSelect";
import { Cuisine, Dish, PlaceType, Region, Tag } from "@prisma/client";
import AddNewFoodPlaceDialog from "./AddNewFoodPlaceDialog";
import useSWR from "swr";
import { paths } from "@/app/api/paths";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FilterPanel = () => {
  const { data: cuisines } = useSWR<Cuisine[]>(paths.cuisines, fetcher);
  const { data: dishes } = useSWR<Dish[]>(paths.dishes, fetcher);
  const { data: tags } = useSWR<Tag[]>(paths.tags, fetcher);

  const explorePageContext = {
    cuisines: cuisines || [],
    dishes: dishes || [],
    tags: tags || [],
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
          <FilterSelect<PlaceType> enumKey="place_type" />
        </div>
        <div className="min-w-32 text-sm">
          <FilterSelect<Region> enumKey="region" />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
