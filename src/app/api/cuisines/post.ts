import database from "@/prisma";
import { TCuisineSchema, cuisineSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function createCuisine(req: NextRequest) {
  const body: TCuisineSchema = await req.json();
  const validation = cuisineSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    await database.cuisine.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
