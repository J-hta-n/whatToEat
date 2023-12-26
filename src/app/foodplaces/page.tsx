import database from "@/prisma";
import { FoodPlace } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import FoodTable from "./_components/table/FoodTable";
import { concatMethod, getOrderBy } from "./_components/table/functions";

interface Props {
  searchParams: FoodQuery;
}

const FoodPlacesPage = async ({ searchParams }: Props) => {
  concatMethod(searchParams);
  const orderBy = getOrderBy(searchParams);
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany({
    orderBy,
  });

  return (
    <>
      <Link href="/foodplaces/add">
        <Button>Add new place</Button>
      </Link>
      <div className="mt-5"></div>
      <FoodTable searchParams={searchParams} foodPlaces={foodPlaces} />
    </>
  );
};

export default FoodPlacesPage;

export type FoodQuery = {
  sortBy?: string | string[];
  page?: string | string[];
};

// To render everything
// {Object.values(place).map((val, i) => (
//   <Table.Cell key={i}>{val}</Table.Cell>
// ))}
