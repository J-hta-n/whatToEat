"use client";

import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import { FoodPlace } from "@prisma/client";
import { JunctionTableEndpoint } from "@/../prisma/dataTypes";
import toast from "react-hot-toast";
import { TFoodPlaceByExploreSchema } from "@/app/api/foodplaces/post.schema";

interface Props {
  excludedFoodPlaces: FoodPlace[];
  exploreId: number;
  junctionTable: JunctionTableEndpoint;
}

export default function AddFoodPlaceSearchBar({
  excludedFoodPlaces,
  exploreId,
  junctionTable,
}: Props) {
  const router = useRouter();
  const handleChange = async (value: FoodPlace | null, reason: string) => {
    // Make API POST request here
    if (reason === "selectOption" && value) {
      const target: FoodPlace = value;
      const data: TFoodPlaceByExploreSchema = {
        foodplace_id: target["id"],
        explore_id: exploreId,
      };
      try {
        const response = await fetch(`/api/${junctionTable}`, {
          method: "POST",
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
        toast.success("Food place added", {
          id: "addfoodplace",
        });
        router.refresh();
      } catch (e) {
        toast.error(`Error: ${e}`);
      }
    } else {
      console.log("Error with adding food place");
    }
  };
  return (
    <Autocomplete
      key="1"
      disableCloseOnSelect
      options={excludedFoodPlaces}
      onChange={(_event, value, reason) => {
        handleChange(value, reason);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Search for food place to add" />
      )}
      getOptionLabel={(place: FoodPlace) => place["place_name"]}
      renderOption={(props, place: FoodPlace) => (
        <li style={{ color: "purple" }} {...props} key={place["id"]}>
          {"- " + place["place_name"]}
        </li>
      )}
    />
  );
}
