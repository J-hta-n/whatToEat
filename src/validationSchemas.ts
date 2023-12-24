import { z } from "zod";

export const addFoodPlaceSchema = z.object({
  place_name: z.string().min(1, "Name is required").max(255),
  place_type: z.string(),
  tried_before: z.coerce.boolean().default(false),
  lb_cost: z.coerce.number().nullable().default(null).optional(),
  ub_cost: z.coerce.number().nullable().default(null).optional(),
  personal_rating: z.coerce.number().nullable().default(null).optional(),
  google_rating: z.coerce.number().nullable().default(null).optional(),
  region: z.string().optional(),
});

export const initialFoodPlace = {
  place_name: "",
  place_type: "RESTAURANT",
  tried_before: false,
  lb_cost: undefined,
  ub_cost: undefined,
  personal_rating: undefined,
  google_rating: undefined,
  region: undefined,
};

export type TAddFoodPlaceSchema = z.infer<typeof addFoodPlaceSchema>;
