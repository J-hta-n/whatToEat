import database from "@/prisma";
import React from "react";
import FoodPlaceForm from "../../_components/form/FoodPlaceForm";
import { Strong } from "@radix-ui/themes";
import { Cuisine, Dish, Tag } from "@prisma/client";
import { TExploreArraysSchema } from "@/validationSchemas";

interface Props {
  params: Promise<{ id: string }>;
}

const EditFoodPlaceForm = async ({ params }: Props) => {
  const placeId = await params.then((params) => parseInt(params.id));

  const foodPlace = await database.foodPlace.findUnique({
    where: {
      id: placeId,
    },
  });
  const cuisines: Cuisine[] = await database.cuisine.findMany();
  const dishes: Dish[] = await database.dish.findMany();
  const tags: Tag[] = await database.tag.findMany();
  const explorePageContext = {
    cuisines: cuisines,
    dishes: dishes,
    tags: tags,
  };

  const cuisineIdsByFoodPlace: number[] = await database.foodPlaceByCuisine
    .findMany({
      where: {
        place_id: placeId,
      },
    })
    .then((cuisinesByFoodPlace) =>
      cuisinesByFoodPlace.map(
        (cuisineByFoodPlace) => cuisineByFoodPlace.cuisine_id
      )
    );
  const dishIdsByFoodPlace: number[] = await database.foodPlaceByDish
    .findMany({
      where: {
        place_id: placeId,
      },
    })
    .then((dishesByFoodPlace) =>
      dishesByFoodPlace.map((dishByFoodPlace) => dishByFoodPlace.dish_id)
    );
  const tagIdsByFoodPlace: number[] = await database.foodPlaceByTag
    .findMany({
      where: {
        place_id: placeId,
      },
    })
    .then((tagsByFoodPlace) =>
      tagsByFoodPlace.map((tagByFoodPlace) => tagByFoodPlace.tag_id)
    );
  const existingExploreArrays: TExploreArraysSchema = {
    cuisines: cuisines
      .filter((cuisine) => cuisineIdsByFoodPlace.includes(cuisine.id))
      .map((cuisine) => ({ value: cuisine.id, label: cuisine.cuisine })),
    dishes: dishes
      .filter((dish) => dishIdsByFoodPlace.includes(dish.id))
      .map((dish) => ({ value: dish.id, label: dish.name })),
    tags: tags
      .filter((tag) => tagIdsByFoodPlace.includes(tag.id))
      .map((tag) => ({ value: tag.id, label: tag.tag })),
  };

  return (
    <div className="justify-items-center">
      <Strong>Edit Food Place</Strong>

      <div className="mt-5">
        <FoodPlaceForm
          existingFoodPlace={foodPlace || undefined}
          existingExploreArrays={existingExploreArrays}
          explorePageContext={explorePageContext}
        />
      </div>
    </div>
  );
};

export default EditFoodPlaceForm;
