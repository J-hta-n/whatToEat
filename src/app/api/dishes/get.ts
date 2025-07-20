import database from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getDishes(req: NextRequest) {
  const cuisines = await database.dish.findMany();
  return NextResponse.json(cuisines, { status: 200 });
}
