"use client";

import { TDishSchema, dishSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dish } from "@prisma/client";
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineModeEdit } from "react-icons/md";

interface Props {
  dish: Dish;
}

const EditDishDialog = ({ dish }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDishSchema>({
    resolver: zodResolver(dishSchema),
  });
  const onSubmit = async (data: TDishSchema) => {
    // make the api POST here
    try {
      const response = await fetch(`/api/dishes/${dish.id}`, {
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
      toast.success("Dish edited successfully");
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
          <Dialog.Title>Edit dish</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Input
              {...register("name")}
              placeholder="Name of dish"
              defaultValue={dish.name}
            />
            {errors["name"] && (
              <p className="m-0 p-0 text-red-500">{errors["name"]?.message}</p>
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

export default EditDishDialog;
