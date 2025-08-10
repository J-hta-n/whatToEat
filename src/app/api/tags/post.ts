import database from "@/prisma";
import { TTagSchema, tagSchema } from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function createTag(req: NextRequest) {
  const body: TTagSchema = await req.json();
  const validation = tagSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const newTag = await database.tag.create({
      data: { tag: body.tag },
    });
    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
