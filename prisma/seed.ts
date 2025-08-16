// seeding instructions taken from https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { PrismaClient } from "@prisma/client";
import {
  foodPlaces,
  cuisines,
  dishes,
  placesByCuisine,
  placesByDish,
  categories,
  tags,
} from "./dummyData";

const prisma = new PrismaClient();
async function main() {
  await prisma.foodPlace.createMany({
    data: foodPlaces.map((place) => {
      return { place_name: place[1], place_type: place[2] };
    }),
  });
  await prisma.cuisine.createMany({
    data: cuisines.map((s) => {
      return { cuisine: s };
    }),
  });
  await prisma.dish.createMany({
    data: dishes.map((s) => {
      return { dish: s };
    }),
  });
  await prisma.foodPlaceByCuisine.createMany({
    data: placesByCuisine.map((row) => {
      return { place_id: row[0], cuisine_id: row[1] };
    }),
  });
  await prisma.foodPlaceByDish.createMany({
    data: placesByDish.map((row) => {
      return { place_id: row[0], dish_id: row[1] };
    }),
  });
  await prisma.category.createMany({
    data: categories.map((s) => {
      return { category: s };
    }),
  });
  await prisma.tag.createMany({
    data: tags.map((row) => {
      return { tag: row[0], category_id: row[1] };
    }),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
