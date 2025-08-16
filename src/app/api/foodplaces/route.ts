import { withUserId } from "@/lib/middlewares/auth";
import { getFoodPlaces } from "./get";
import { createFoodplace } from "./post";

export const GET = withUserId(getFoodPlaces);
export const POST = withUserId(createFoodplace);
