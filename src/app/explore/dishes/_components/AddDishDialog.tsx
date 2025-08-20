"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AddButton from "../../_components/AddButton";
import { dishSchema, TDishSchema } from "@/app/api/dishes/post.schema";
import { mutate } from "swr";

const AddDishDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDishSchema>({
    resolver: zodResolver(dishSchema),
  });
  const onSubmit = async (data: TDishSchema) => {
    setIsSubmitting(true);
    // make the api POST here
    try {
      const response = await fetch("/api/dishes", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        toast.error(
          `Error ${response.status}: ${JSON.stringify(responseData.error)}`
        );
        setIsSubmitting(false);
        return;
      }
      mutate("/api/dishes");
      setIsDialogOpen(false);
      toast.success("New dish added");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
          <AddButton />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Add new dish</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Input {...register("dish")} placeholder="Name of dish" />
            {errors["dish"] && (
              <p className="m-0 p-0 text-red-500">{errors["dish"]?.message}</p>
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
              <Button type="submit" disabled={isSubmitting}>
                Add
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddDishDialog;
