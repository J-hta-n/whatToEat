import { FoodPlace } from "@prisma/client";
import React from "react";

interface Props {
  items: FoodPlace[] | null;
}

const SimpleList = ({ items }: Props) => {
  return (
    <ul>{items?.map((item) => <li key={item.id}>{item.place_name}</li>)}</ul>
  );
};

export default SimpleList;
