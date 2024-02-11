"use client";

import { TCuisineSchema, cuisineSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddCuisineDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCuisineSchema>({
    resolver: zodResolver(cuisineSchema),
  });
  const onSubmit = async (data: TCuisineSchema) => {
    // make the api POST here
    try {
      const response = await fetch("/api/cuisines", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        toast.error(
          `Error ${response.status}: ${JSON.stringify(responseData.error)}`
        );
        return;
      }
      setIsDialogOpen(false);
      toast.success("New cuisine added");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };
  return (
    <>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
          <Button>Add new cuisine</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Add new cuisine</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Input
              {...register("cuisine")}
              placeholder="Name of cuisine"
            />
            {errors["cuisine"] && (
              <p className="m-0 p-0 text-red-500">
                {errors["cuisine"]?.message}
              </p>
            )}

            <Flex gap="3" mt="3" justify="end">
              <Button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddCuisineDialog;
