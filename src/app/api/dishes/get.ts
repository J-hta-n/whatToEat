import { RequestWithUserId } from "@/lib/middlewares/auth";
import database from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getDishes(req: RequestWithUserId) {
  const dishes = await database.dish.findMany({
    where: { created_by: req.userId },
  });
  return NextResponse.json(dishes, { status: 200 });
}
