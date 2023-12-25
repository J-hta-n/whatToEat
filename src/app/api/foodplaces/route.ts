import database from "@/prisma";
import { TAddFoodPlaceSchema, addFoodPlaceSchema } from "@/validationSchemas";
import { FoodPlace } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: FoodPlace = await req.json();
  const validation = addFoodPlaceSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  const { id, ...args } = body;
  console.log(args);
  try {
    const newFoodPlace = await database.foodPlace.create({
      data: {
        ...args,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
