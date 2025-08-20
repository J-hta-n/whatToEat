"use client";

import Spinner from "@/components/ui/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cuisine, Dish, FoodPlace, Tag } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { exploreArrayFields, inputFields } from "./InputFields";
import { mutate } from "swr";
import {
  defaultFoodPlace,
  foodPlaceByExploreArraysSchema,
  TExploreArraysSchema,
  TFoodPlaceByExploreArraysSchema,
} from "@/app/api/foodplaces/post.schema";

interface Props {
  existingFoodPlace?: FoodPlace;
  existingExploreArrays?: TExploreArraysSchema;
  explorePageContext: {
    cuisines: Cuisine[];
    dishes: Dish[];
    tags: Tag[];
  };
  setIsDialogOpen?: (open: boolean) => void;
}

const FoodPlaceForm = ({
  existingFoodPlace,
  existingExploreArrays,
  setIsDialogOpen,
  explorePageContext,
}: Props) => {
  // reason isSubmitting from formState is not used is bcos we
  // only want the spinner to stop after the whole api function
  // is done, not just after submitting on the client side, so
  // as to improve the smoothness of the UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFoodPlaceByExploreArraysSchema>({
    resolver: zodResolver(foodPlaceByExploreArraysSchema),
    defaultValues: existingFoodPlace || defaultFoodPlace,
  });
  type NewType = TFoodPlaceByExploreArraysSchema;

  const onSubmit = async (data: NewType) => {
    setIsSubmitting(true);
    try {
      let response: Response;
      if (existingFoodPlace) {
        response = await fetch(`/api/foodplaces/${existingFoodPlace.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/foodplaces", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        toast.error(
          `Error ${response.status}: ${JSON.stringify(responseData.error)}`
        );
        setIsSubmitting(false);
        return;
      }
      // IMPT: need to revalidate all keys that start with `/api/foodplaces` to prevent stale data
      // with different keys. Alternative is to set { revalidateIfStale: true } in useSWR
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/foodplaces"),
        undefined, // no direct update, just trigger revalidation
        { revalidate: true } // IMPT: need to explicitly revalidate this key to update cache
      );
      router.push(`/foodplaces?${searchParams}`);
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
    setIsSubmitting(false);
    setIsDialogOpen ? setIsDialogOpen(false) : undefined;
  };
  return (
    <div className="flex justify-center h-5/6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-5/6 flex flex-col">
        {inputFields.map((inputField, i) => {
          return (
            <div className="p-0 m-0 flex flex-col" key={i}>
              {inputField.component(register, control)}
              {errors[inputField.key] && (
                <p className="m-0 p-0 text-red-500">
                  {errors[inputField.key]?.message}
                </p>
              )}
            </div>
          );
        })}
        {exploreArrayFields.map((exploreArrayField, i) => {
          return (
            <div className="p-0 m-0 flex flex-col" key={i}>
              {exploreArrayField.component(
                explorePageContext,
                control,
                existingExploreArrays
              )}
              {errors[exploreArrayField.key] && (
                <p className="m-0 p-0 text-red-500">
                  {errors[exploreArrayField.key]?.message}
                </p>
              )}
            </div>
          );
        })}
        <div className="flex-grow" />
        <Flex gap="9" justify="center" className="mt-6 pb-6">
          <Link href={`/foodplaces?${searchParams}`}>
            <Button
              type="button"
              onClick={() =>
                setIsDialogOpen ? setIsDialogOpen(false) : undefined
              }
            >
              cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {existingFoodPlace ? "Update" : "Submit"}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default FoodPlaceForm;
