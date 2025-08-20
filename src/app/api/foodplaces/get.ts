import { NextResponse } from "next/server";
import { FoodPlace } from "@prisma/client";
import { RequestWithUserId } from "@/lib/middlewares/auth";
import { getFoodPlacesService } from "@/lib/prisma/foodplaces/service";

export const PAGE_SIZE = 20;

export type GetFoodPlacesResponse = {
  foodPlaces: FoodPlace[];
  totalPages: number;
  curPage: number;
};

export async function getFoodPlaces(request: RequestWithUserId) {
  try {
    const userId = request.userId;
    const { searchParams } = new URL(request.url);

    const { foodPlaces, totalPages, curPage } = await getFoodPlacesService(
      searchParams,
      PAGE_SIZE,
      userId
    );

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
