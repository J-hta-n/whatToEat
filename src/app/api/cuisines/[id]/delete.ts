import database from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Props } from "./route";

export async function deleteCuisine(req: NextRequest, { params }: Props) {
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
    await database.cuisine.delete({
      where: { id: cuisineId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
