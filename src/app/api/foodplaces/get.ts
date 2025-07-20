// app/api/food-places/route.ts

import { NextResponse } from "next/server";
import database from "@/prisma";
import { FoodPlace } from "@prisma/client";
import {
  buildWhereQuery,
  buildOrderByQuery,
  getPage,
} from "@/lib/utils/searchParamUtils";

export const PAGE_SIZE = 20;

export type GetFoodPlacesResponse = {
  foodPlaces: FoodPlace[];
  totalPages: number;
  curPage: number;
};

export async function getFoodPlaces(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderBy = buildOrderByQuery(searchParams);
    const where = buildWhereQuery(searchParams);
    const curPage = getPage(searchParams);
    const skip = (curPage - 1) * PAGE_SIZE;

    const [foodPlaces, foodPlaceCount] = await Promise.all([
      database.foodPlace.findMany({
        // @ts-ignore
        orderBy, // orderBy is of type {keyof FoodPlace, "asc" | "dsc"}[]
        where,
        skip,
        take: PAGE_SIZE,
      }),
      database.foodPlace.count({ where }),
    ]);
    const totalPages = Math.ceil(foodPlaceCount / PAGE_SIZE);

    return NextResponse.json({
      foodPlaces,
      totalPages,
      curPage,
    } as GetFoodPlacesResponse);
  } catch (e) {
    console.log("[getFoodPlaces] Error fetching food places.\n", e);
    return NextResponse.json(
      { error: "Failed to fetch food places." },
      { status: 500 }
    );
  }
}
