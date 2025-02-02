import database from "@/prisma";
import {
  TExploreArraysSchema,
  TFoodPlaceByExploreArraysSchema,
  TFoodPlaceSchema,
  exploreArraysSchema,
  foodPlaceSchema,
} from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: TFoodPlaceByExploreArraysSchema = await req.json();
  const validation = foodPlaceSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const foodPlace: TFoodPlaceSchema = {} as TFoodPlaceSchema;
    Object.keys(foodPlaceSchema.shape).forEach((key) => {
      if (key in body) {
        //@ts-ignore
        foodPlace[key] = body[key];
      }
    });

    const newFoodPlace = await database.foodPlace.create({
      data: {
        ...foodPlace,
      },
    });
    const junctionTableArrays: TExploreArraysSchema =
      {} as TExploreArraysSchema;
    Object.keys(exploreArraysSchema.shape).forEach((key) => {
      if (key in body) {
        //@ts-ignore
        junctionTableArrays[key] = body[key];
      }
    });

    await database.foodPlaceByCuisine.createMany({
      data: junctionTableArrays["cuisines"].map((selectedObj) => ({
        place_id: newFoodPlace["id"],
        cuisine_id: selectedObj["value"],
      })),
    });
    await database.foodPlaceByDish.createMany({
      data: junctionTableArrays["dishes"].map((selectedObj) => ({
        place_id: newFoodPlace["id"],
        dish_id: selectedObj["value"],
      })),
    });
    await database.foodPlaceByTag.createMany({
      data: junctionTableArrays["tags"].map((selectedObj) => ({
        place_id: newFoodPlace["id"],
        tag_id: selectedObj["value"],
      })),
    });

    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
