import { withUserId } from "@/lib/middlewares/auth";
import { getCuisines } from "./get";
import { createCuisine } from "./post";

export const GET = withUserId(getCuisines);
export const POST = withUserId(createCuisine);
