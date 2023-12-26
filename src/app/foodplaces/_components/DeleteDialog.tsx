"use client";

import Spinner from "@/app/_components/Spinner";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  id: number;
  name: string;
}

const DeleteDialog = ({ id, name }: Props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteFoodPlace = async () => {
    setIsDeleting(true);
    const response = await fetch(`/api/foodplaces/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setErrorMsg(`Error ${response.status}: ${JSON.stringify(response.body)}`);
      return;
    }
    router.refresh();
    setIsDeleting(false);
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton
            radius="full"
            size="1"
            variant="ghost"
            className="p-0 m-0"
            color="red"
          >
            {isDeleting ? <Spinner /> : <RiDeleteBin6Line />}
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>{`Delete ${name}`}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this entry? This action is
            irreversible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteFoodPlace}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">{errorMsg}</AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button>Ok</Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteDialog;
