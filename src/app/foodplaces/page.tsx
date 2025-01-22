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
import { Heading, Text } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

interface Props {
  searchParams: Promise<FoodQuery>;
}

const PAGE_SIZE = 20;

// To prevent the page component from becoming a client component, lift all states
// to the URL instead, hence tapping on the searchParams state
const FoodPlacesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  concatMethod(params);
  const orderBy = getOrderBy(params);
  const where = buildWhereQuery(params);
  const curPage = params.page ? parseInt(params.page) : 1;
  const skipCount = (curPage - 1) * PAGE_SIZE;
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany({
    // @ts-ignore
    orderBy, // orderBy is of type {keyof FoodPlace, "asc" | "dsc"}[]
    where,
    skip: skipCount,
    take: PAGE_SIZE,
  });
  const foodPlaceCount = await database.foodPlace.count({ where });
  const totalPages = Math.ceil(foodPlaceCount / PAGE_SIZE);

  return (
    <>
      <div className="text-center mb-10">
        <Toaster /> // TODO: Find out why toast isn't showing
        <Heading mb="1">Food Places Database</Heading>
        <Text size="2" color="grass">
          Feel free to create, modify, and delete the list of food places here.
          Places can be tagged to according to various categories in the
          {"'Explore'"} page.
          <br />
          [Coming soon: Being able to tag places directly from this page]
        </Text>
      </div>
      <FilterPanel searchParams={params} />
      <div className="mt-5"></div>
      <FoodTable
        searchParams={params}
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
