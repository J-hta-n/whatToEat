import { z } from "zod";

export const cuisineSchema = z.object({
  cuisine: z.string().min(1, "Cuisine name is required").max(255),
});

export type TCuisineSchema = z.infer<typeof cuisineSchema>;

export const foodPlaceByExploreSchema = z.object({
  foodplace_id: z.number(),
  explore_id: z.number(),
});
