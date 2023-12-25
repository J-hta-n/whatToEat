import database from "@/prisma";
import { FoodPlace } from "@prisma/client";
import {
  Button,
  IconButton,
  Table,
  TableColumnHeaderCell,
} from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { enumMappings } from "@/../prisma/enumMappings";

const FoodPlacesPage = async () => {
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany({
    orderBy: { id: "asc" },
  });
  const columns: { label: string; value: keyof FoodPlace }[] = [
    { label: "name", value: "place_name" },
    { label: "place type", value: "place_type" },
    // { label: "tried before", value: "tried_before" },
    // { label: "min price", value: "lb_cost" },
    { label: "price point", value: "ub_cost" },
    // { label: "own rating", value: "personal_rating" },
    { label: "google rating", value: "google_rating" },
    { label: "region", value: "region" },
  ];

  return (
    <>
      <Link href="/foodplaces/add">
        <Button>Add new place</Button>
      </Link>
      <div className="mt-5"></div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>id</TableColumnHeaderCell>
            {columns.map((col) => (
              <TableColumnHeaderCell key={col.value}>
                {col.label}
              </TableColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {foodPlaces.map((place, i) => (
            <Table.Row key={place.id}>
              <Table.Cell>{i + 1}</Table.Cell>
              {columns.map((col) => (
                <Table.Cell key={col.value}>
                  {enumMappings[col.value]
                    ? enumMappings[col.value][place[col.value]]
                    : place[col.value]}
                </Table.Cell>
              ))}
              <Table.Cell className="flex gap-x-3">
                <Link href={`/foodplaces/edit/${place.id}`}>
                  <IconButton
                    radius="full"
                    size="1"
                    variant="ghost"
                    className="p-0 m-0"
                  >
                    <MdOutlineModeEdit />
                  </IconButton>
                </Link>
                <IconButton
                  radius="full"
                  size="1"
                  variant="ghost"
                  className="p-0 m-0"
                >
                  <RiDeleteBin6Line />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default FoodPlacesPage;

// To render everything
// {Object.values(place).map((val, i) => (
//   <Table.Cell key={i}>{val}</Table.Cell>
// ))}
