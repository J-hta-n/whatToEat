"use client";

import { Dialog, Button, Flex, TextField } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";
import EditButton from "../_components/EditButton";
import { useRouter } from "next/navigation";

type EditDialogProps<TSchema extends z.ZodTypeAny> = {
  title: string;
  schema: TSchema;
  defaultValues: z.infer<TSchema>;
  apiUrl: string;
  successMessage: string;
  renderFields: (
    register: ReturnType<typeof useForm<z.infer<TSchema>>>["register"],
    errors: ReturnType<typeof useForm<z.infer<TSchema>>>["formState"]["errors"]
  ) => React.ReactNode;
};

export function EditDialog<TSchema extends z.ZodTypeAny>({
  title,
  schema,
  defaultValues,
  apiUrl,
  successMessage,
  renderFields,
}: EditDialogProps<TSchema>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<TSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(
          `Error ${response.status}: ${JSON.stringify(responseData.error)}`
        );
        return;
      }
      toast.success(successMessage);
      setIsDialogOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
        <EditButton />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFields(register, errors)}
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
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
