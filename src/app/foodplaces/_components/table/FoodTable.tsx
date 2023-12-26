import {
  Table,
  TableColumnHeaderCell,
  IconButton,
  Flex,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdOutlineModeEdit,
} from "react-icons/md";
import { enumMappings } from "@/../prisma/enumMappings";
import DeleteDialog from "./DeleteDialog";
import { FoodPlace } from "@prisma/client";
import { columnVals, columns } from "./TableConfig";
import { FoodQuery } from "../../page";
import { orderBy } from "lodash";
import { useSearchParams } from "next/navigation";
import { isColSorted, setNewSortQuery } from "./functions";

interface Props {
  searchParams: FoodQuery; // used to pass back current search params
  foodPlaces: FoodPlace[];
}

const FoodTable = ({ searchParams, foodPlaces }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <TableColumnHeaderCell>id</TableColumnHeaderCell>
          {columns.map((col) => {
            const params = new URLSearchParams(searchParams);
            setNewSortQuery(params, col.value);

            return (
              <TableColumnHeaderCell key={col.value}>
                <Flex align="center">
                  <Link
                    href={
                      params.toString()
                        ? {
                            query: params.toString(),
                          }
                        : "/foodplaces"
                    }
                  >
                    {col.label}
                  </Link>
                  {!isColSorted(params, col.value) && <MdArrowUpward />}
                </Flex>
              </TableColumnHeaderCell>
            );
          })}
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
              <DeleteDialog id={place.id} name={place.place_name} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default FoodTable;
