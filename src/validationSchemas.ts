import { PlaceType, Region } from "@prisma/client";
import { z } from "zod";

export const foodPlaceSchema = z.object({
  place_name: z.string().min(1, "Name is required").max(255),
  place_type: z.nativeEnum(PlaceType),
  tried_before: z.coerce.boolean(),
  lb_cost: z.coerce.number().min(0, "Cost must be greater than $0").nullable(),
  ub_cost: z.coerce.number().min(0, "Cost must be greater than $0").nullable(),
  personal_rating: z.coerce.number().min(0).max(5).nullable(),
  google_rating: z.coerce.number().min(0).max(5).nullable(),
  region: z.nativeEnum(Region).nullable(),
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

export type TFoodPlaceSchema = z.infer<typeof foodPlaceSchema>;

export const exploreArraysSchema = z.object({
  cuisines: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([]),
  dishes: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([]),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .default([]),
});

export type TExploreArraysSchema = z.infer<typeof exploreArraysSchema>;

export const foodPlaceByExploreArraysSchema =
  foodPlaceSchema.merge(exploreArraysSchema);

export type TFoodPlaceByExploreArraysSchema = z.infer<
  typeof foodPlaceByExploreArraysSchema
>;

export const tagSchema = z.object({
  tag: z.string().min(1, "Tag name is required").max(255),
});

export type TTagSchema = z.infer<typeof tagSchema>;

export const dishSchema = z.object({
  name: z.string().min(1, "Dish name is required").max(255),
});

export type TDishSchema = z.infer<typeof dishSchema>;

export const cuisineSchema = z.object({
  cuisine: z.string().min(1, "Cuisine name is required").max(255),
});

export type TCuisineSchema = z.infer<typeof cuisineSchema>;

export const foodPlaceByExploreSchema = z.object({
  foodplace_id: z.number(),
  explore_id: z.number(),
});

export type TFoodPlaceByExploreSchema = z.infer<
  typeof foodPlaceByExploreSchema
>;
