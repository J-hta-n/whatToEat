import { TFoodPlaceSchema } from "@/validationSchemas";
import { ReactNode } from "react";

export const InputFields: { label: string; component: ReactNode }[] = [];

export const inputFields: { label: string; value: keyof TFoodPlaceSchema }[] = [
  { label: "Place name", value: "place_name" },
  { label: "Place type", value: "place_type" },
  { label: "Tried before", value: "tried_before" },
  { label: "Min cost", value: "lb_cost" },
  { label: "Max cost", value: "ub_cost" },
  { label: "Personal rating", value: "personal_rating" },
  { label: "Google rating", value: "google_rating" },
  { label: "Region", value: "region" },
];
