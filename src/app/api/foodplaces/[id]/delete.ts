import database from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Props } from "./route";
import { RequestWithUserId } from "@/lib/middlewares/auth";

export async function deleteFoodPlace(
  req: RequestWithUserId,
  { params }: Props
) {
  try {
    const routeParams = await params;
    const placeId = parseInt(routeParams.id);
    const foodPlace = await database.foodPlace.findUnique({
      where: { id: placeId, created_by: req.userId },
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
