import database from "@/prisma";
import {
  TFoodPlaceByExploreSchema,
  foodPlacesByExploreSchema,
} from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: TFoodPlaceByExploreSchema = await req.json();
  const validation = foodPlacesByExploreSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const newEntry = await database.foodPlaceByCuisine.create({
      data: {
        place_id: body["foodplace_id"],
        cuisine_id: body["explore_id"],
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body: TFoodPlaceByExploreSchema = await req.json();
  const validation = foodPlacesByExploreSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const response = await database.foodPlaceByCuisine.delete({
      where: {
        place_id_cuisine_id: {
          place_id: body["foodplace_id"],
          cuisine_id: body["explore_id"],
        },
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
