import { withUserId } from "@/lib/middlewares/auth";
import { deleteFoodPlace } from "./delete";
import { updateFoodPlace } from "./patch";

export interface Props {
  params: Promise<{ id: string }>;
}

export const PATCH = withUserId(updateFoodPlace);
export const DELETE = withUserId(deleteFoodPlace);
