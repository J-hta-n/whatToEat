"use client";

import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import AddDishDialog from "./_components/AddDishDialog";
import DeleteDialog from "../_components/DeleteDialog";
import EditDishDialog from "./_components/EditDishDialog";
import useSWR from "swr";
import { Dish } from "@prisma/client";
import SpinnerLoading from "../_components/SpinnerLoading";

const DishesPage = () => {
  const { data: dishes, isLoading } = useSWR<Dish[]>(
    "/api/dishes",
    (url: string) => fetch(url).then((res) => res.json())
  );
  return (
    <SubPage backHref="/explore" title="Dishes" addDialog={<AddDishDialog />}>
      <Toaster />
      {isLoading ? (
        <SpinnerLoading />
      ) : dishes?.length === 0 ? (
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <Text size="4" weight="medium" color="gray">
            No dishes yet — add one to get started!
          </Text>
        </Flex>
      ) : (
        <Flex gap="3" align="center" wrap="wrap">
          {dishes?.map((dish) => (
            <Card
              key={dish.id}
              variant="classic"
              style={{
                maxWidth: 250,
                backgroundColor: "azure",
              }}
            >
              <Flex gap="1" align="center">
                <Link
                  href={`/explore/dishes/${dish.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{dish.dish}</Text>
                </Link>
                <EditDishDialog dish={dish} />
                <DeleteDialog
                  apiUrl={`/api/dishes/${dish.id}`}
                  entryName={dish.dish}
                  refetchUrl={"/api/dishes"}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </SubPage>
  );
};

export default DishesPage;
