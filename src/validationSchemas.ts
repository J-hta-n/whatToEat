import { PlaceType, Region } from "@prisma/client";
import { z } from "zod";

export const addFoodPlaceSchema = z.object({
  place_name: z.string().min(1, "Name is required").max(255),
  place_type: z.nativeEnum(PlaceType),
  tried_before: z.coerce.boolean(),
  lb_cost: z.coerce.number().nullable(),
  ub_cost: z.coerce.number().nullable(),
  personal_rating: z.coerce.number().nullable(),
  google_rating: z.coerce.number().nullable(),
  region: z.nativeEnum(Region),
});

export const defaultFoodPlace = {
  place_name: "",
  place_type: PlaceType.RESTAURANT,
  tried_before: false,
  lb_cost: null,
  ub_cost: null,
  personal_rating: null,
  google_rating: null,
  region: Region.ISLANDWIDE,
};

export type TAddFoodPlaceSchema = z.infer<typeof addFoodPlaceSchema>;
