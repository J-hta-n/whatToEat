import { FoodPlace } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  items: FoodPlace[] | null;
  name: string;
}

const SimpleList = ({ items, name }: Props) => {
  return items === null || items.length === 0 ? (
    <Text className="text-center">
      Oops, no food places found for {"'{name}'"}
    </Text>
  ) : (
    <>
      <Text className="text-center underline">{name}</Text>
      <ul>{items?.map((item) => <li key={item.id}>{item.place_name}</li>)}</ul>
    </>
  );
};

export default SimpleList;
