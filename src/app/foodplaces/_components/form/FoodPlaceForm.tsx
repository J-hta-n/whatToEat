"use client";

import Spinner from "@/app/_components/Spinner";
import {
  TFoodPlaceSchema,
  foodPlaceSchema,
  defaultFoodPlace,
} from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodPlace } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { inputFields } from "./InputFields";

interface Props {
  existingFoodPlace?: FoodPlace;
  setIsDialogOpen?: (open: boolean) => void;
}

const FoodPlaceForm = ({ existingFoodPlace, setIsDialogOpen }: Props) => {
  // reason isSubmitting from formState is not used is bcos we
  // only want the spinner to stop after the whole api function
  // is done, not just after submitting on the client side, so
  // as to improve the smoothness of the UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFoodPlaceSchema>({
    resolver: zodResolver(foodPlaceSchema),
    defaultValues: existingFoodPlace || defaultFoodPlace,
  });
  const onSubmit = async (data: TFoodPlaceSchema) => {
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
      <Toaster />
    </div>
  );
};

export default FoodPlaceForm;
