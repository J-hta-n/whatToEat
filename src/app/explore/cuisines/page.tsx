"use client";

import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import AddCuisineDialog from "./_components/AddCuisineDialog";
import DeleteDialog from "../_components/DeleteDialog";
import EditCuisineDialog from "./_components/EditCuisineDialog";
import useSWR from "swr";
import { Cuisine } from "@prisma/client";
import SpinnerLoading from "../_components/SpinnerLoading";

const CuisinesPage = () => {
  // TODO: Display all cuisines here in a sidebar list, abstract that component out for reuse
  // for locations and dishes too
  const { data: cuisines, isLoading } = useSWR<Cuisine[]>(
    "/api/cuisines",
    (url: string) => fetch(url).then((res) => res.json())
  );
  return (
    <SubPage
      backHref="/explore"
      title="Cuisines"
      addDialog={<AddCuisineDialog />}
    >
      <Toaster />
      {isLoading ? (
        <SpinnerLoading />
      ) : cuisines?.length === 0 ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Text size="4" weight="medium" color="gray">
            No cuisines yet — add one to get started!
          </Text>
        </Flex>
      ) : (
        <Flex gap="3" align="center" wrap="wrap">
          {cuisines?.map((cuisine) => (
            <Card
              key={cuisine.id}
              variant="classic"
              style={{
                maxWidth: 250,
                backgroundColor: "azure",
              }}
            >
              <Flex gap="1" align="center">
                <Link
                  href={`/explore/cuisines/${cuisine.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{cuisine.cuisine}</Text>
                </Link>
                <EditCuisineDialog cuisine={cuisine} />
                <DeleteDialog
                  apiUrl={`/api/cuisines/${cuisine.id}`}
                  entryName={cuisine.cuisine}
                  refetchUrl={"/api/cuisines"}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </SubPage>
  );
};

export default CuisinesPage;
