/*
  Warnings:

  - You are about to alter the column `place_name` on the `FoodPlace` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "FoodPlace" ALTER COLUMN "place_name" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" SERIAL NOT NULL,
    "cuisine" VARCHAR(100) NOT NULL,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "region" "Region" NOT NULL,
    "address" VARCHAR(255) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(100) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodPlaceByCuisine" (
    "id" SERIAL NOT NULL,
    "place_id" INTEGER NOT NULL,
    "cuisine_id" INTEGER NOT NULL,

    CONSTRAINT "FoodPlaceByCuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodPlaceByLocation" (
    "id" SERIAL NOT NULL,
    "place_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "FoodPlaceByLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodPlaceByTag" (
    "id" SERIAL NOT NULL,
    "place_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "FoodPlaceByTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodPlaceByCuisine" ADD CONSTRAINT "FoodPlaceByCuisine_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByCuisine" ADD CONSTRAINT "FoodPlaceByCuisine_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByLocation" ADD CONSTRAINT "FoodPlaceByLocation_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByLocation" ADD CONSTRAINT "FoodPlaceByLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByTag" ADD CONSTRAINT "FoodPlaceByTag_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByTag" ADD CONSTRAINT "FoodPlaceByTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
