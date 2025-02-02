"use client";

import Spinner from "@/app/_components/Spinner";
import {
  TFoodPlaceByExploreArraysSchema,
  foodPlaceByExploreArraysSchema,
  defaultFoodPlace,
} from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cuisine, Dish, FoodPlace, Tag } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { exploreArrayFields, inputFields } from "./InputFields";

interface Props {
  existingFoodPlace?: FoodPlace;
  setIsDialogOpen?: (open: boolean) => void;
  explorePageContext: {
    cuisines: Cuisine[];
    dishes: Dish[];
    tags: Tag[];
  };
}

const FoodPlaceForm = ({
  existingFoodPlace,
  setIsDialogOpen,
  explorePageContext,
}: Props) => {
  // reason isSubmitting from formState is not used is bcos we
  // only want the spinner to stop after the whole api function
  // is done, not just after submitting on the client side, so
  // as to improve the smoothness of the UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFoodPlaceByExploreArraysSchema>({
    resolver: zodResolver(foodPlaceByExploreArraysSchema),
    defaultValues: existingFoodPlace || defaultFoodPlace,
  });
  const onSubmit = async (data: TFoodPlaceByExploreArraysSchema) => {
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
      router.push("/foodplaces");
      router.refresh();
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
              {exploreArrayField.component(explorePageContext, control)}
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
          <Link href="/foodplaces">
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
