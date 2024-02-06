import { FoodPlace } from "@prisma/client";
import React from "react";

interface Props {
  items: FoodPlace[];
}

const SimpleList = ({ items }: Props) => {
  return (
    <ul>
      {items.map((item) => (
        <li>{item.place_name}</li>
      ))}
    </ul>
  );
};

export default SimpleList;
