"use client";

import {
  TAddFoodPlaceSchema,
  addFoodPlaceSchema,
  defaultFoodPlace,
} from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddFoodPlaceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddFoodPlaceSchema>({
    resolver: zodResolver(addFoodPlaceSchema),
    defaultValues: defaultFoodPlace,
  });
  const onSubmit = async (data: TAddFoodPlaceSchema) => {
    const response = await fetch("/api/foodplaces", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      alert(`Error ${response.status}: ${JSON.stringify(responseData.error)}`);
      return;
    }
    reset();
    setIsOpen(false);
    router.refresh();
  };
  return (
    <Dialog.Root open={isOpen}>
      <Button onClick={() => setIsOpen(true)}>Add new place</Button>
      <Dialog.Content>
        <Dialog.Title>New food place</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Flex gap="5">
            <Button type="button" onClick={() => setIsOpen(false)}>
              cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddFoodPlaceForm;

const inputFields: { label: string; value: keyof TAddFoodPlaceSchema }[] = [
  { label: "Place name", value: "place_name" },
  { label: "Place type", value: "place_type" },
  { label: "Tried before", value: "tried_before" },
  { label: "Min cost", value: "lb_cost" },
  { label: "Max cost", value: "ub_cost" },
  { label: "Personal rating", value: "personal_rating" },
  { label: "Google rating", value: "google_rating" },
  { label: "Region", value: "region" },
];
