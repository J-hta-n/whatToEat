import database from "@/prisma";
import { FoodPlace, PlaceType, Region } from "@prisma/client";
import FoodTable from "./_components/table/FoodTable";
import {
  buildWhereQuery,
  concatMethod,
  getOrderBy,
} from "./_components/table/functions";
import FilterPanel from "./_components/table/FilterPanel";
import Pagination from "../_components/Pagination";

interface Props {
  searchParams: FoodQuery;
}

const PAGE_SIZE = 10;

// To prevent the page component from becoming a client component, lift all states
// to the URL instead, hence tapping on the searchParams state
const FoodPlacesPage = async ({ searchParams }: Props) => {
  concatMethod(searchParams);
  const orderBy = getOrderBy(searchParams);
  const where = buildWhereQuery(searchParams);
  const curPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const skipCount = (curPage - 1) * PAGE_SIZE;
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany({
    orderBy, // orderBy is of type {keyof FoodPlace, "asc" | "dsc"}[]
    where,
    skip: skipCount,
    take: PAGE_SIZE,
  });
  const foodPlaceCount = await database.foodPlace.count({ where });
  const totalPages = Math.ceil(foodPlaceCount / PAGE_SIZE);

  return (
    <>
      <FilterPanel searchParams={searchParams} />
      <div className="mt-5"></div>
      <FoodTable
        searchParams={searchParams}
        foodPlaces={foodPlaces}
        idOffset={skipCount}
      />
      <Pagination curPage={curPage} totalPages={totalPages} />
    </>
  );
};

export default FoodPlacesPage;

// string[][] denotes an iterable key-value pair,
// used to validate URLSearchParams() construction
export type FoodQuery = string[][] & {
  sortBy?: string | string[];
  place_type?: PlaceType | PlaceType[];
  region?: Region | Region[];
  page?: string;
};

// To render everything
// {Object.values(place).map((val, i) => (
//   <Table.Cell key={i}>{val}</Table.Cell>
// ))}
