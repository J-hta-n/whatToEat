"use client";

import { useRouter } from "next/navigation";

import { FoodPlace } from "@prisma/client";
import { IconButton, Text } from "@radix-ui/themes";
import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { JunctionTableEndpoint } from "../../../../prisma/dataTypes";
import { TFoodPlaceByExploreSchema } from "@/validationSchemas";
import toast from "react-hot-toast";

interface Props {
  items: FoodPlace[] | null;
  title: string;
  exploreId: number;
  junctionTable: JunctionTableEndpoint;
}

const SimpleList = ({ items, title, exploreId, junctionTable }: Props) => {
  const router = useRouter();

  const removeFoodPlace = async (placeId: number) => {
    // Make DELETE API call
    const data: TFoodPlaceByExploreSchema = {
      foodplace_id: placeId,
      explore_id: exploreId,
    };
    try {
      const response = await fetch(`/api/${junctionTable}`, {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        toast.error(
          `Error ${response.status}: ${JSON.stringify(responseData.error)}`
        );
        return;
      }
      // TODO: Find out why this doesn't work
      toast.success("Food place removed", {
        id: "removefoodplace",
      });
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };

  return items === null || items.length === 0 ? (
    <Text className="text-center">Oops, no food places found for {title}</Text>
  ) : (
    <div style={{ justifyItems: "center" }}>
      <Text className="text-center underline">{title}</Text>
      <ul style={{ width: "50%" }}>
        {items?.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.place_name}
            <IconButton
              radius="full"
              size="1"
              variant="ghost"
              className="p-0 m-0"
              color="red"
            >
              <IoIosRemoveCircleOutline
                onClick={() => removeFoodPlace(item["id"])}
                color="grey"
                size={"20px"}
              />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleList;
