import { RequestWithUserId } from "@/lib/middlewares/auth";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";
import database from "@/lib/prisma";
import { NextResponse } from "next/server";
import { tagSchema, TTagSchema } from "./post.schema";

export async function createTag(req: RequestWithUserId) {
  const body: TTagSchema = await req.json();
  const validation = tagSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }
  try {
    const newTag = await database.tag.create({
      data: {
        ...body,
        created_by: req.userId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
