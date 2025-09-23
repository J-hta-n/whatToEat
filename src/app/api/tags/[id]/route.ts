import database from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { tagSchema, TTagSchema } from "../post.schema";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
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
    const routeParams = await params;
    const tagId = parseInt(routeParams.id);
    const tag = await database.tag.findUnique({
      where: { id: tagId },
    });
    if (!tag) {
      return NextResponse.json({ error: "invalid tag id" }, { status: 404 });
    }
    const updatedTag = await database.tag.update({
      where: { id: tagId },
      data: {
        tag: body.tag,
      },
    });
    return NextResponse.json(updatedTag, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const routeParams = await params;
    const tagId = parseInt(routeParams.id);
    const tag = await database.tag.findUnique({
      where: { id: tagId },
    });
    if (!tag) {
      return NextResponse.json({ error: "invalid tag id" }, { status: 404 });
    }
    await database.tag.delete({
      where: { id: tagId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
