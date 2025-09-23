import database from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Props } from "./route";

export async function deleteDish(req: NextRequest, { params }: Props) {
  try {
    const routeParams = await params;
    const dishId = parseInt(routeParams.id);
    const dish = await database.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      return NextResponse.json({ error: "invalid dish id" }, { status: 404 });
    }
    await database.dish.delete({
      where: { id: dishId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
