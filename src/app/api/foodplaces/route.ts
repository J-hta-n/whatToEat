import database from "@/prisma";
import { TFoodPlaceSchema, foodPlaceSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const newFoodPlace = await database.foodPlace.create({
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
