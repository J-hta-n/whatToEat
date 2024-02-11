import { FoodPlace } from "@prisma/client";

//////// COLUMNS TO DISPLAY ///////
export const columns: { label: string; value: keyof FoodPlace }[] = [
  { label: "name", value: "place_name" },
  { label: "place type", value: "place_type" },
  // { label: "tried before", value: "tried_before" },
  // { label: "min price", value: "lb_cost" },
  // { label: "price point", value: "ub_cost" },
  // { label: "own rating", value: "personal_rating" },
  // { label: "google rating", value: "google_rating" },
  { label: "region", value: "region" },
];

export const columnVals: (keyof FoodPlace)[] = columns.map((col) => col.value);

/////// COLUMNS TO FILTER BY ///////
