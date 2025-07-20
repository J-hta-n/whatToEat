import { deleteCuisine } from "./delete";
import { updateCuisine } from "./patch";

export interface Props {
  params: Promise<{ id: string }>;
}

export const PATCH = updateCuisine;
export const DELETE = deleteCuisine;
