import { deleteFoodPlace } from "./delete";
import { updateFoodPlace } from "./patch";

export interface Props {
  params: Promise<{ id: string }>;
}

export const PATCH = updateFoodPlace;
export const DELETE = deleteFoodPlace;
