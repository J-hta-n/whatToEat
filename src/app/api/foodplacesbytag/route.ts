import database from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {
  foodPlaceByExploreSchema,
  TFoodPlaceByExploreSchema,
} from "../foodplaces/post.schema";

export async function POST(req: NextRequest) {
  const body: TFoodPlaceByExploreSchema = await req.json();
  const validation = foodPlaceByExploreSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const newEntry = await database.foodPlaceByTag.create({
      data: {
        place_id: body["foodplace_id"],
        tag_id: body["explore_id"],
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
  const validation = foodPlaceByExploreSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const response = await database.foodPlaceByTag.delete({
      where: {
        place_id_tag_id: {
          place_id: body["foodplace_id"],
          tag_id: body["explore_id"],
        },
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
