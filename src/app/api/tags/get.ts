import { RequestWithUserId } from "@/lib/middlewares/auth";
import database from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getTags(req: RequestWithUserId) {
  const cuisines = await database.tag.findMany({
    where: { created_by: req.userId },
  });
  return NextResponse.json(cuisines, { status: 200 });
}
