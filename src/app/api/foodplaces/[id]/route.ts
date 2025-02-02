import database from "@/prisma";
import {
  TExploreArraysSchema,
  TFoodPlaceByExploreArraysSchema,
  TFoodPlaceSchema,
  exploreArraysSchema,
  foodPlaceSchema,
} from "@/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body: TFoodPlaceByExploreArraysSchema = await req.json();
  const validation = foodPlaceSchema.safeParse(body);
  if (!validation.success) {
    let zodErrors = {};
    validation.error.errors.forEach((error) => {
      zodErrors = { ...zodErrors, [error.path[0]]: error.message };
    });
    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }
  try {
    const routeParams = await params;
    const placeId = parseInt(routeParams.id);
    const foodPlace = await database.foodPlace.findUnique({
      where: { id: placeId },
    });
    if (!foodPlace) {
      return NextResponse.json(
        { error: "invalid food place id" },
        { status: 404 }
      );
    }
    const updatedFoodPlaceBody: TFoodPlaceSchema = {} as TFoodPlaceSchema;
    Object.keys(foodPlaceSchema.shape).forEach((key) => {
      if (key in body) {
        //@ts-ignore
        updatedFoodPlaceBody[key] = body[key];
      }
    });
    const updatedFoodPlace = await database.foodPlace.update({
      where: { id: placeId },
      data: {
        ...updatedFoodPlaceBody,
      },
    });
    const junctionTableArrays: TExploreArraysSchema =
      {} as TExploreArraysSchema;
    Object.keys(exploreArraysSchema.shape).forEach((key) => {
      if (key in body) {
        //@ts-ignore
        junctionTableArrays[key] = body[key];
      }
    });

    const oldCuisines = await database.foodPlaceByCuisine.findMany({
      where: { place_id: placeId },
    });
    const oldDishes = await database.foodPlaceByDish.findMany({
      where: { place_id: placeId },
    });
    const oldTags = await database.foodPlaceByTag.findMany({
      where: { place_id: placeId },
    });

    const cuisinesByFoodPlaceToDelete = oldCuisines
      .filter(
        (cuisineByFoodPlace) =>
          !junctionTableArrays["cuisines"]
            .map((selectedCuisine) => selectedCuisine["value"])
            .includes(cuisineByFoodPlace["cuisine_id"])
      )
      .map((cuisineByFoodPlace) => cuisineByFoodPlace["cuisine_id"]);
    const cuisinesByFoodPlaceToInsert = junctionTableArrays["cuisines"]
      .map((selectedCuisine) => selectedCuisine["value"])
      .filter(
        (id) =>
          !oldCuisines
            .map((cuisineByFoodPlace) => cuisineByFoodPlace["cuisine_id"])
            .includes(id)
      );

    const dishesByFoodPlaceToDelete = oldDishes
      .filter(
        (dishByFoodPlace) =>
          !junctionTableArrays["dishes"]
            .map((selectedDish) => selectedDish["value"])
            .includes(dishByFoodPlace["dish_id"])
      )
      .map((dishByFoodPlace) => dishByFoodPlace["dish_id"]);
    const dishesByFoodPlaceToInsert = junctionTableArrays["dishes"]
      .map((selectedDish) => selectedDish["value"])
      .filter(
        (id) =>
          !oldDishes
            .map((dishByFoodPlace) => dishByFoodPlace["dish_id"])
            .includes(id)
      );

    const tagsByFoodPlaceToDelete = oldTags
      .filter(
        (tagByFoodPlace) =>
          !junctionTableArrays["tags"]
            .map((selectedTag) => selectedTag["value"])
            .includes(tagByFoodPlace["tag_id"])
      )
      .map((tagByFoodPlace) => tagByFoodPlace["tag_id"]);
    const tagsByFoodPlaceToInsert = junctionTableArrays["tags"]
      .map((selectedTag) => selectedTag["value"])
      .filter(
        (id) =>
          !oldTags
            .map((tagByFoodPlace) => tagByFoodPlace["tag_id"])
            .includes(id)
      );

    await database.foodPlaceByCuisine.deleteMany({
      where: {
        place_id: placeId,
        cuisine_id: {
          in: cuisinesByFoodPlaceToDelete,
        },
      },
    });
    await database.foodPlaceByCuisine.createMany({
      data: cuisinesByFoodPlaceToInsert.map((id) => ({
        place_id: placeId,
        cuisine_id: id,
      })),
    });

    await database.foodPlaceByDish.deleteMany({
      where: {
        place_id: placeId,
        dish_id: {
          in: dishesByFoodPlaceToDelete,
        },
      },
    });
    await database.foodPlaceByDish.createMany({
      data: dishesByFoodPlaceToInsert.map((id) => ({
        place_id: placeId,
        dish_id: id,
      })),
    });

    await database.foodPlaceByTag.deleteMany({
      where: {
        place_id: placeId,
        tag_id: {
          in: tagsByFoodPlaceToDelete,
        },
      },
    });
    await database.foodPlaceByTag.createMany({
      data: tagsByFoodPlaceToInsert.map((id) => ({
        place_id: placeId,
        tag_id: id,
      })),
    });

    return NextResponse.json(updatedFoodPlace, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const routeParams = await params;
    const placeId = parseInt(routeParams.id);
    const foodPlace = await database.foodPlace.findUnique({
      where: { id: placeId },
    });
    if (!foodPlace) {
      return NextResponse.json(
        { error: "invalid food place id" },
        { status: 404 }
      );
    }
    await database.foodPlace.delete({
      where: { id: placeId },
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
