import { deleteDish } from "./delete";
import { updateDish } from "./patch";

export interface Props {
  params: Promise<{ id: string }>;
}

export const PATCH = updateDish;
export const DELETE = deleteDish;
