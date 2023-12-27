import database from "@/prisma";
import { FoodPlace, PlaceType, Region } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import FoodTable from "./_components/table/FoodTable";
import {
  buildWhereQuery,
  concatMethod,
  getOrderBy,
} from "./_components/table/functions";
import FilterPlaceType from "./_components/table/FilterPlaceType";
import FilterRegion from "./_components/table/FilterRegion";
import FilterPanel from "./_components/table/FilterPanel";

interface Props {
  searchParams: FoodQuery;
}

const FoodPlacesPage = async ({ searchParams }: Props) => {
  concatMethod(searchParams);
  const orderBy = getOrderBy(searchParams);
  const where = buildWhereQuery(searchParams);
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany({
    orderBy,
    where,
  });

  return (
    <>
      <FilterPanel searchParams={searchParams} />
      <div className="mt-5"></div>
      <FoodTable searchParams={searchParams} foodPlaces={foodPlaces} />
    </>
  );
};

export default FoodPlacesPage;

export type FoodQuery = {
  sortBy?: string | string[];
  place_type?: PlaceType | PlaceType[];
  region?: Region | Region[];
  page?: string | string[];
};

// To render everything
// {Object.values(place).map((val, i) => (
//   <Table.Cell key={i}>{val}</Table.Cell>
// ))}
