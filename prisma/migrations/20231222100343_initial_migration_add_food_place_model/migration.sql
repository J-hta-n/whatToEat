-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('RESTAURANT', 'HAWKER_STALL', 'CANTEEN_STALL', 'BAKERY', 'DESSERT_PLACE');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('NORTH', 'EAST', 'CENTRAL', 'WEST', 'ISLANDWIDE');

-- CreateTable
CREATE TABLE "FoodPlace" (
    "id" SERIAL NOT NULL,
    "main_theme" VARCHAR(255) NOT NULL,
    "place_name" VARCHAR(255) NOT NULL,
    "place_type" "PlaceType" NOT NULL DEFAULT 'RESTAURANT',
    "tried_before" BOOLEAN NOT NULL DEFAULT false,
    "lb_cost" INTEGER DEFAULT 1,
    "ub_cost" INTEGER DEFAULT 20,
    "personal_rating" INTEGER DEFAULT 0,
    "google_rating" INTEGER DEFAULT 0,
    "region" "Region" DEFAULT 'ISLANDWIDE',

    CONSTRAINT "FoodPlace_pkey" PRIMARY KEY ("id")
);
