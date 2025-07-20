import database from "@/prisma";
import { TCuisineSchema, cuisineSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Props } from "./route";
import { getValidationErrorResponse } from "@/lib/utils/error-responses";

export async function updateCuisine(req: NextRequest, { params }: Props) {
  const body: TCuisineSchema = await req.json();
  const validation = cuisineSchema.safeParse(body);
  if (!validation.success) {
    return getValidationErrorResponse(validation.error);
  }
  try {
    const routeParams = await params;
    const cuisineId = parseInt(routeParams.id);
    const cuisine = await database.cuisine.findUnique({
      where: { id: cuisineId },
    });
    if (!cuisine) {
      return NextResponse.json(
        { error: "invalid cuisine id" },
        { status: 404 }
      );
    }
    const updatedCuisine = await database.cuisine.update({
      where: { id: cuisineId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedCuisine, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
