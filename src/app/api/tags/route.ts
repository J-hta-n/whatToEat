import { withUserId } from "@/lib/middlewares/auth";
import { getTags } from "./get";
import { createTag } from "./post";

export const GET = withUserId(getTags);
export const POST = withUserId(createTag);
