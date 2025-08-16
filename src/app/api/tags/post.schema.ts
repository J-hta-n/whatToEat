import { z } from "zod";

export const tagSchema = z.object({
  tag: z.string().min(1, "Tag name is required").max(255),
});

export type TTagSchema = z.infer<typeof tagSchema>;
