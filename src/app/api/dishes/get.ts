import { RequestWithUserId } from "@/lib/middlewares/auth";
import database from "@/prisma";
import { NextResponse } from "next/server";

export async function getDishes(req: RequestWithUserId) {
  const cuisines = await database.dish.findMany({
    where: { created_by: req.userId },
  });
  return NextResponse.json(cuisines, { status: 200 });
}
