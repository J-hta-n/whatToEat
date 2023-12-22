import database from "@/prisma";
import { FoodPlace } from "@prisma/client";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import React from "react";

const FoodPlacesPage = async () => {
  const foodPlaces = await database.foodPlace.findMany();
  const columns: { label: string; value: keyof FoodPlace }[] = [
    { label: "id", value: "id" },
    // { label: "main theme", value: "main_theme" },
    { label: "name", value: "place_name" },
    { label: "place type", value: "place_type" },
    // { label: "tried before", value: "tried_before" },
    // { label: "min price", value: "lb_cost" },
    { label: "price point", value: "ub_cost" },
    // { label: "own rating", value: "personal_rating" },
    // { label: "google rating", value: "google_rating" },
    { label: "region", value: "region" },
  ];

  const enumMappings = {
    place_type: {
      RESTAURANT: "restaurant",
      HAWKER_STALL: "hawker stall",
      CANTEEN_STALL: "canteen stall",
      BAKERY: "bakery",
      DESSERT_PLACE: "dessert place",
    },
  };

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <TableColumnHeaderCell key={col.value}>
                {col.label}
              </TableColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {foodPlaces.map((place) => (
            <Table.Row key={place.id}>
              {columns.map((col) => (
                <Table.Cell>
                  {enumMappings[col.value]
                    ? enumMappings[col.value][place[col.value]]
                    : place[col.value]}
                </Table.Cell>
              ))}
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
