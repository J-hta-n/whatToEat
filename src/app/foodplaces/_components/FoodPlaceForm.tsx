"use client";

import {
  TFoodPlaceSchema,
  foodPlaceSchema,
  defaultFoodPlace,
} from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodPlace } from "@prisma/client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  existingFoodPlace?: FoodPlace;
}

const FoodPlaceForm = ({ existingFoodPlace }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFoodPlaceSchema>({
    resolver: zodResolver(foodPlaceSchema),
    defaultValues: existingFoodPlace || defaultFoodPlace,
  });
  const onSubmit = async (data: TFoodPlaceSchema) => {
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
        return;
      }
      router.push("/foodplaces");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5">
        {inputFields.map((inputField, i) => {
          return (
            <div className="p-0 m-0 flex flex-col" key={i}>
              <input
                {...register(inputField.value)}
                placeholder={inputField.label}
                className="p-1 mt-5 border-2"
              />
              {errors[inputField.value] && (
                <p className="m-0 p-0 text-red-500">
                  {errors[inputField.value]?.message}
                </p>
              )}
            </div>
          );
        })}
        <div className="pt-10" />
        <Flex gap="9" justify="center">
          <Link href="/foodplaces">
            <Button type="button">cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {existingFoodPlace ? "Update" : "Submit"}
          </Button>
        </Flex>
      </form>
      <Toaster />
    </div>
  );
};

export default FoodPlaceForm;

const inputFields: { label: string; value: keyof TFoodPlaceSchema }[] = [
  { label: "Place name", value: "place_name" },
  { label: "Place type", value: "place_type" },
  { label: "Tried before", value: "tried_before" },
  { label: "Min cost", value: "lb_cost" },
  { label: "Max cost", value: "ub_cost" },
  { label: "Personal rating", value: "personal_rating" },
  { label: "Google rating", value: "google_rating" },
  { label: "Region", value: "region" },
];
