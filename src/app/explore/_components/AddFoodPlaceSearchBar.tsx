"use client";

import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Autocomplete, {
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";
import { FoodPlace } from "@prisma/client";
import { JunctionTableEndpoint } from "../../../../prisma/dataTypes";
import { TFoodPlaceByExploreSchema } from "@/validationSchemas";
import toast from "react-hot-toast";

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
  const handleChange = async (
    reason: string,
    details: AutocompleteChangeDetails<FoodPlace> | undefined
  ) => {
    // Make API POST request here
    if (reason === "selectOption" && details) {
      const target: FoodPlace = details["option"];
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
        // TODO: Find out why toast doesn't appear
        toast.success("Food place added");
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
      inputValue=""
      disableCloseOnSelect
      options={excludedFoodPlaces}
      onChange={(_event, _value, reason, details) => {
        handleChange(reason, details);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Add Food Place" />}
      getOptionLabel={(place: FoodPlace) => place["place_name"]}
      renderOption={(props, place: FoodPlace) => (
        <li style={{ color: "purple" }} {...props} key={place["id"]}>
          {"- " + place["place_name"]}
        </li>
      )}
    />
  );
}
