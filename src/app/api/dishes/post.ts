import { RequestWithUserId } from "@/lib/middlewares/auth";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";
import database from "@/lib/prisma";
import { NextResponse } from "next/server";
import { dishSchema, TDishSchema } from "./post.schema";

export async function createDish(req: RequestWithUserId) {
  const body: TDishSchema = await req.json();
  const validation = dishSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }
  try {
    await database.dish.create({
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
