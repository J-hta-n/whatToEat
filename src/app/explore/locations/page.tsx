import database from "@/prisma";
import React from "react";
import SubPage from "../_components/SubPage";
import { Card, Flex } from "@radix-ui/themes";
import Link from "next/link";

const TagsPage = async () => {
  // TODO: GET all locations and load them
  const locations = await database.location.findMany();

  // TODO: Display the locations in card form
  return (
    <SubPage backHref="/explore" title="Locations">
      {locations.length == 0 ? (
        <p className="text-center">Under development: coming soon</p>
      ) : (
        <Flex gap="3" align="center" wrap="wrap">
          {locations.map((loc) => {
            return (
              <Link key={loc.id} href={`/explore/locations/${loc.id}`}>
                <Card
                  variant="classic"
                  style={{
                    maxWidth: 250,
                    backgroundColor: "azure",
                  }}
                  className="hover:text-emerald-700"
                >
                  {loc.name}
                </Card>
              </Link>
            );
          })}
        </Flex>
      )}
    </SubPage>
  );
};

export default TagsPage;
