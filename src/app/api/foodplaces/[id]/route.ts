import database from "@/prisma";
import { TFoodPlaceSchema, foodPlaceSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body: TFoodPlaceSchema = await req.json();
  const validation = foodPlaceSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const placeId = parseInt(params.id);
    const foodPlace = await database.foodPlace.findUnique({
      where: { id: placeId },
    });
    if (!foodPlace) {
      return NextResponse.json(
        { error: "invalid food place id" },
        { status: 404 }
      );
    }
    const updatedFoodPlace = await database.foodPlace.update({
      where: { id: placeId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedFoodPlace, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const placeId = parseInt(params.id);
    const foodPlace = await database.foodPlace.findUnique({
      where: { id: placeId },
    });
    if (!foodPlace) {
      return NextResponse.json(
        { error: "invalid food place id" },
        { status: 404 }
      );
    }
    await database.foodPlace.delete({
      where: { id: placeId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
