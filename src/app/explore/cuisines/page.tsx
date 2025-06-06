export const dynamic = "force-dynamic";

import React from "react";
import SubPage from "../_components/SubPage";
import database from "@/prisma";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import AddCuisineDialog from "./_components/AddCuisineDialog";
import DeleteDialog from "../_components/DeleteDialog";
import EditCuisineDialog from "./_components/EditCuisineDialog";

const CuisinesPage = async () => {
  // TODO: Display all cuisines here in a nice card list, abstract that component out for reuse
  // for locations and dishes too
  const cuisines = await database.cuisine.findMany();
  return (
    <SubPage
      backHref="/explore"
      title="Cuisines"
      addDialog={<AddCuisineDialog />}
    >
      <Toaster />
      <Flex gap="3" align="center" wrap="wrap">
        {cuisines.map((cuisine) => {
          return (
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
                  key={cuisine.id}
                  href={`/explore/cuisines/${cuisine.id}`}
                  className="hover:text-emerald-700 align-middle text-center"
                >
                  <Text>{cuisine.cuisine}</Text>
                </Link>
                <EditCuisineDialog cuisine={cuisine} />
                <DeleteDialog
                  apiUrl={`/api/cuisines/${cuisine.id}`}
                  entryName={cuisine.cuisine}
                />
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </SubPage>
  );
};

export default CuisinesPage;
