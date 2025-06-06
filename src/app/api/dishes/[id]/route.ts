import database from "@/prisma";
import { TDishSchema, dishSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body: TDishSchema = await req.json();
  const validation = dishSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
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

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const routeParams = await params;
    const dishId = parseInt(routeParams.id);
    const dish = await database.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      return NextResponse.json({ error: "invalid dish id" }, { status: 404 });
    }
    await database.dish.delete({
      where: { id: dishId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
