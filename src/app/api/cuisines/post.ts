import { RequestWithUserId } from "@/lib/middlewares/auth";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";
import database from "@/prisma";
import { NextResponse } from "next/server";
import { cuisineSchema, TCuisineSchema } from "./post.schema";

export async function createCuisine(req: RequestWithUserId) {
  const body: TCuisineSchema = await req.json();
  const validation = cuisineSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }

  try {
    await database.cuisine.create({
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
