import database from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getCuisines(req: NextRequest) {
  const cuisines = await database.cuisine.findMany();
  return NextResponse.json(cuisines, { status: 200 });
}
