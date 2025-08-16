import { RequestWithUserId } from "@/lib/middlewares/auth";
import {
  TFoodPlaceByExploreArraysSchema,
  foodPlaceSchema,
} from "./post.schema";
import { NextResponse } from "next/server";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";
import { createFoodPlaceService } from "@/lib/prisma/foodplaces/service";

export const createFoodplace = async (req: RequestWithUserId) => {
  const body: TFoodPlaceByExploreArraysSchema = await req.json();

  const validation = foodPlaceSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }

  try {
    const newFoodPlace = await createFoodPlaceService(body, req.userId);
    console.log("New food place created:", newFoodPlace);
    return NextResponse.json({ status: 201, data: newFoodPlace });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
