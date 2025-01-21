import database from "@/prisma";
import { TCuisineSchema, cuisineSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
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
    const updatedCuisine = await database.cuisine.update({
      where: { id: cuisineId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedCuisine, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
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
