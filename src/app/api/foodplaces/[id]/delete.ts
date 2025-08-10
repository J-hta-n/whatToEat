import database from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Props } from "./route";

export async function deleteFoodPlace(req: NextRequest, { params }: Props) {
  try {
    const routeParams = await params;
    const placeId = parseInt(routeParams.id);
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
