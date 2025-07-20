import database from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getTags(req: NextRequest) {
  const cuisines = await database.tag.findMany();
  return NextResponse.json(cuisines, { status: 200 });
}
