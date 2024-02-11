"use client";

import { TCuisineSchema, cuisineSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cuisine } from "@prisma/client";
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineModeEdit } from "react-icons/md";

interface Props {
  cuisine: Cuisine;
}

const EditCuisineDialog = ({ cuisine }: Props) => {
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
      const response = await fetch(`/api/cuisines/${cuisine.id}`, {
        method: "PATCH",
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
      toast.success("Cuisine edited successfully");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };
  return (
    <>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
          <IconButton
            radius="full"
            size="1"
            variant="ghost"
            color="blue"
            className="opacity-30 hover:opacity-100 hover:cursor-pointer"
            onClick={(e) => {
              console.log(e);
            }}
          >
            <MdOutlineModeEdit />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Edit cuisine</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Input
              {...register("cuisine")}
              placeholder="Name of cuisine"
              defaultValue={cuisine.cuisine}
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
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default EditCuisineDialog;
