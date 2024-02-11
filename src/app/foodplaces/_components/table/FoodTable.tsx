import { enumMappings } from "@/../prisma/enumMappings";
import { FoodPlace } from "@prisma/client";
import {
  Flex,
  IconButton,
  Table,
  TableColumnHeaderCell,
} from "@radix-ui/themes";
import Link from "next/link";
import { MdArrowUpward, MdOutlineModeEdit } from "react-icons/md";
import { FoodQuery } from "../../page";
import DeleteDialog from "./DeleteDialog";
import { columns } from "./TableConfig";
import { isColSorted, setNewSortQuery } from "./functions";

interface Props {
  searchParams: FoodQuery; // used to pass back current search params
  foodPlaces: FoodPlace[];
  idOffset: number; // start id offset to account for different pages
}

const FoodTable = ({ searchParams, foodPlaces, idOffset }: Props) => {
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
            <Table.Cell>{i + 1 + idOffset}</Table.Cell>
            {columns.map((col) => (
              <Table.Cell key={col.value}>
                {enumMappings[col.value]
                  ? // @ts-ignore
                    enumMappings[col.value][place[col.value]]
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
