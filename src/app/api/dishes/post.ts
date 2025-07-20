import { getValidationErrorResponse } from "@/lib/utils/error-responses";
import database from "@/prisma";
import { TDishSchema, dishSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function createDish(req: NextRequest) {
  const body: TDishSchema = await req.json();
  const validation = dishSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }
  try {
    await database.dish.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
