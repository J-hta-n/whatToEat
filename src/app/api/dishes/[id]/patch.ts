import database from "@/prisma";
import { TDishSchema, dishSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Props } from "./route";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";

export async function updateDish(req: NextRequest, { params }: Props) {
  const body: TDishSchema = await req.json();
  const validation = dishSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }
  try {
    const routeParams = await params;
    const dishId = parseInt(routeParams.id);
    const dish = await database.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      return NextResponse.json({ error: "invalid dish id" }, { status: 404 });
    }
    const updatedDish = await database.dish.update({
      where: { id: dishId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedDish, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
