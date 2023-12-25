import database from "@/prisma";
import { FoodPlace } from "@prisma/client";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import React from "react";
import AddFoodPlaceForm from "./_components/AddFoodPlaceForm";
import { enumMappings } from "../../../prisma/enumMappings";

const FoodPlacesPage = async () => {
  const foodPlaces: FoodPlace[] = await database.foodPlace.findMany();
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
      <AddFoodPlaceForm />
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
