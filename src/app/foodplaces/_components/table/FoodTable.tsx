"use client";

import { enumMappings } from "@/../prisma/enumMappings";
import {
  Flex,
  IconButton,
  Table,
  TableColumnHeaderCell,
} from "@radix-ui/themes";
import Link from "next/link";
import { MdArrowUpward, MdOutlineModeEdit } from "react-icons/md";
import DeleteDialog from "./DeleteDialog";
import { columns } from "./TableConfig";
import {
  canonicaliseSearchParams,
  isColSorted,
  setNewSortQuery,
} from "@/lib/utils/searchParamUtils";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Loading from "../../loading";
import { GetFoodPlacesResponse } from "@/app/api/foodplaces/get";
import { useEffect, useRef, useState } from "react";
import Pagination from "@/components/Pagination";

const FoodTable = () => {
  const searchParams = useSearchParams();
  console.log("BRUHHH", canonicaliseSearchParams(searchParams));
  const { data, isLoading } = useSWR<GetFoodPlacesResponse>(
    searchParams.toString()
      ? `/api/foodplaces?${canonicaliseSearchParams(searchParams)}`
      : "/api/foodplaces",
    (url: string) => fetch(url).then((res) => res.json()),
    {
      // Prevents background revalidation on every sort/filter rerender; only mutate when
      // foodplace is edited, added, or deleted
      revalidateIfStale: false,
    }
  );
  const [cachedData, setCachedData] = useState<GetFoodPlacesResponse | null>(
    null
  );
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (data) {
      setCachedData(data);
      isFirstLoad.current = false;
    }
  }, [data]);

  if (isFirstLoad.current && isLoading) return <Loading />;

  const foodPlaces = cachedData?.foodPlaces || [];
  const totalPages = cachedData?.totalPages || 1;
  const curPage = cachedData?.curPage || 1;

  return (
    <>
      <Pagination curPage={curPage} totalPages={totalPages} />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell key="id" className="w-[10%]">
              id
            </TableColumnHeaderCell>
            {columns.map((col) => {
              const params = new URLSearchParams(searchParams);
              setNewSortQuery(params, col.value);

              return (
                <TableColumnHeaderCell
                  key={col.value}
                  className={`w-[${col.width}]`}
                >
                  <Flex align="center">
                    <Link
                      href={
                        params.toString()
                          ? { query: params.toString() }
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
            <TableColumnHeaderCell key="edit" className="w-[17%]" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {foodPlaces.map((place, i) => (
            <Table.Row key={place.id}>
              <Table.Cell>{i + 1 + (curPage - 1) * totalPages}</Table.Cell>
              {columns.map((col) => (
                <Table.Cell key={col.value}>
                  {enumMappings[col.value]
                    ? // @ts-ignore
                      enumMappings[col.value][place[col.value]]
                    : place[col.value]}
                </Table.Cell>
              ))}
              <Table.Cell key="edit" className="flex gap-x-3">
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
      <Pagination curPage={curPage} totalPages={totalPages} />
    </>
  );
};

export default FoodTable;
