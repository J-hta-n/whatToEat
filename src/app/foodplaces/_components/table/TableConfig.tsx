import { FoodPlace } from "@prisma/client";

//////// COLUMNS TO DISPLAY ///////
export const columns: {
  label: string;
  value: keyof FoodPlace;
  width: string;
}[] = [
  { label: "name", value: "place_name", width: "30%" },
  { label: "place type", value: "place_type", width: "20%" },
  // { label: "tried before", value: "tried_before" },
  // { label: "min price", value: "lb_cost" },
  // { label: "price point", value: "ub_cost" },
  // { label: "own rating", value: "personal_rating" },
  // { label: "google rating", value: "google_rating" },
  { label: "region", value: "region", width: "20%" },
];

export const columnVals: (keyof FoodPlace)[] = columns.map((col) => col.value);

/////// COLUMNS TO FILTER BY ///////
