import { RequestWithUserId } from "@/lib/middlewares/auth";
import database from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getCuisines(req: RequestWithUserId) {
  const cuisines = await database.cuisine.findMany({
    where: { created_by: req.userId },
  });
  return NextResponse.json(cuisines, { status: 200 });
}
