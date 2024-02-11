"use client";

import { TTagSchema, tagSchema } from "@/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const AddTagDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTagSchema>({
    resolver: zodResolver(tagSchema),
  });
  const onSubmit = async (data: TTagSchema) => {
    // make the api POST here
    try {
      const response = await fetch("/api/tags", {
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
      toast.success("New tag added");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };
  return (
    <>
      <Dialog.Root open={isDialogOpen}>
        <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
          <Button>Add new tag</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Add new Tag</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Input {...register("tag")} placeholder="Name of tag" />
            {errors["tag"] && (
              <p className="m-0 p-0 text-red-500">{errors["tag"]?.message}</p>
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

export default AddTagDialog;
