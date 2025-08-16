import { withUserId } from "@/lib/middlewares/auth";
import { getDishes } from "./get";
import { createDish } from "./post";

export const GET = withUserId(getDishes);
export const POST = withUserId(createDish);
