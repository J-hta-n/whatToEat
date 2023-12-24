"use client";

import { TAddFoodPlaceSchema, addFoodPlaceSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

const AddFoodPlaceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddFoodPlaceSchema>({
    resolver: zodResolver(addFoodPlaceSchema),
  });
  const onSubmit = async (data: TAddFoodPlaceSchema) => {
    console.log(data);
    reset();
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add new place</Button>
      </Dialog.Trigger>
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
            <Dialog.Close>
              <Button type="submit">cancel</Button>
            </Dialog.Close>
            <Button>Submit</Button>
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
