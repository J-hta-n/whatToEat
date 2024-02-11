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
  // TODO: Fetch all cuisines directly from database; dunnid to unnecessarily abstract api
  // TODO: Display all cuisines here in a nice card list, abstract that component out for reuse
  // for locations and cuisines too
  const cuisines = await database.cuisine.findMany();
  return (
    <SubPage backHref="/explore" title="Cuisines">
      <Toaster />
      <Flex gap="5" justify="end" className="mr-20">
        <AddCuisineDialog />
      </Flex>
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
      {/* <Flex gap="3" align="center" wrap="wrap">
        {cuisines.map((cuisine) => {
          return (
            <Link key={cuisine.id} href={`/explore/cuisines/${cuisine.id}`}>
              <Card
                variant="classic"
                style={{
                  maxWidth: 250,
                  backgroundColor: "azure",
                }}
                className="hover:text-emerald-700"
              >
                {cuisine.cuisine}
              </Card>
            </Link>
          );
        })}
      </Flex> */}
    </SubPage>
  );
};

export default CuisinesPage;
