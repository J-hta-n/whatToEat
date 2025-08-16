export const dynamic = "force-dynamic";

import database from "@/prisma";
import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import AddDishDialog from "./_components/AddDishDialog";
import DeleteDialog from "../_components/DeleteDialog";
import EditDishDialog from "./_components/EditDishDialog";

const DishesPage = async () => {
  const dishes = await database.dish.findMany();

  return (
    <SubPage backHref="/explore" title="Dishes" addDialog={<AddDishDialog />}>
      <Toaster />
      <Flex gap="3" align="center" wrap="wrap">
        {dishes.map((dish) => {
          return (
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
                  key={dish.id}
                  href={`/explore/dishes/${dish.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{dish.dish}</Text>
                </Link>
                <EditDishDialog dish={dish} />
                <DeleteDialog
                  apiUrl={`/api/dishes/${dish.id}`}
                  entryName={dish.dish}
                />
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </SubPage>
  );
};

export default DishesPage;
