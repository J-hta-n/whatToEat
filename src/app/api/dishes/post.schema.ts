import { z } from "zod";

export const dishSchema = z.object({
  dish: z.string().min(1, "Dish name is required").max(255),
});

export type TDishSchema = z.infer<typeof dishSchema>;
