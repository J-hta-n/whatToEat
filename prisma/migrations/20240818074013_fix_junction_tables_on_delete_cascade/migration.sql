/*
  Warnings:

  - The primary key for the `FoodPlaceByCuisine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FoodPlaceByCuisine` table. All the data in the column will be lost.
  - The primary key for the `FoodPlaceByDish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FoodPlaceByDish` table. All the data in the column will be lost.
  - The primary key for the `FoodPlaceByLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FoodPlaceByLocation` table. All the data in the column will be lost.
  - The primary key for the `FoodPlaceByTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FoodPlaceByTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodPlaceByCuisine" DROP CONSTRAINT "FoodPlaceByCuisine_cuisine_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByCuisine" DROP CONSTRAINT "FoodPlaceByCuisine_place_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByDish" DROP CONSTRAINT "FoodPlaceByDish_dish_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByDish" DROP CONSTRAINT "FoodPlaceByDish_place_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByLocation" DROP CONSTRAINT "FoodPlaceByLocation_location_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByLocation" DROP CONSTRAINT "FoodPlaceByLocation_place_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByTag" DROP CONSTRAINT "FoodPlaceByTag_place_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodPlaceByTag" DROP CONSTRAINT "FoodPlaceByTag_tag_id_fkey";

-- AlterTable
ALTER TABLE "FoodPlaceByCuisine" DROP CONSTRAINT "FoodPlaceByCuisine_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FoodPlaceByCuisine_pkey" PRIMARY KEY ("place_id", "cuisine_id");

-- AlterTable
ALTER TABLE "FoodPlaceByDish" DROP CONSTRAINT "FoodPlaceByDish_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FoodPlaceByDish_pkey" PRIMARY KEY ("place_id", "dish_id");

-- AlterTable
ALTER TABLE "FoodPlaceByLocation" DROP CONSTRAINT "FoodPlaceByLocation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FoodPlaceByLocation_pkey" PRIMARY KEY ("place_id", "location_id");

-- AlterTable
ALTER TABLE "FoodPlaceByTag" DROP CONSTRAINT "FoodPlaceByTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FoodPlaceByTag_pkey" PRIMARY KEY ("place_id", "tag_id");

-- AddForeignKey
ALTER TABLE "FoodPlaceByCuisine" ADD CONSTRAINT "FoodPlaceByCuisine_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByCuisine" ADD CONSTRAINT "FoodPlaceByCuisine_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByDish" ADD CONSTRAINT "FoodPlaceByDish_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByDish" ADD CONSTRAINT "FoodPlaceByDish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByLocation" ADD CONSTRAINT "FoodPlaceByLocation_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByLocation" ADD CONSTRAINT "FoodPlaceByLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByTag" ADD CONSTRAINT "FoodPlaceByTag_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "FoodPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodPlaceByTag" ADD CONSTRAINT "FoodPlaceByTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
