import database from "@/prisma";
import { TFoodPlaceSchema } from "@/validationSchemas";
import { Prisma } from "@prisma/client";

type RelationType = "cuisines" | "dishes" | "tags";

const createFoodPlace = async (
  tx: Prisma.TransactionClient,
  body: TFoodPlaceSchema & { created_by?: string }
) => {
  const createdPlace = await tx.foodPlace.create({
    data: body,
  });
  return createdPlace;
};

const createRelations = async (
  relationKey: RelationType,
  table: any,
  items: { value: number }[],
  placeId: number
) => {
  if (!items.length) return;

  await table.createMany({
    data: items.map((i) =>
      relationKey === "cuisines"
        ? { place_id: placeId, cuisine_id: i.value }
        : relationKey === "dishes"
          ? { place_id: placeId, dish_id: i.value }
          : { place_id: placeId, tag_id: i.value }
    ),
  });
};

/**
 * Uses a prisma transaction client to ensure atomicity when creating a
 * food place along with its relations.
 */
export const createFoodPlaceWithRelationsTransaction = async (
  body: TFoodPlaceSchema & { created_by?: string },
  relations: {
    cuisines?: { value: number }[];
    dishes?: { value: number }[];
    tags?: { value: number }[];
  }
) => {
  return database.$transaction(async (tx) => {
    const createdPlace = await createFoodPlace(tx, body);
    await Promise.all([
      createRelations(
        "cuisines",
        tx.foodPlaceByCuisine,
        relations.cuisines || [],
        createdPlace.id
      ),
      createRelations(
        "dishes",
        tx.foodPlaceByDish,
        relations.dishes || [],
        createdPlace.id
      ),
      createRelations(
        "tags",
        tx.foodPlaceByTag,
        relations.tags || [],
        createdPlace.id
      ),
    ]);
    return createdPlace;
  });
};

export const fetchFoodPlaces = async (args: Prisma.FoodPlaceFindManyArgs) => {
  return database.foodPlace.findMany(args);
};

export const countFoodPlaces = async (where?: Prisma.FoodPlaceWhereInput) => {
  return database.foodPlace.count({ where });
};
