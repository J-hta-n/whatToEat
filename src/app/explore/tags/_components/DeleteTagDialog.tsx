"use client";

import { Tag } from "@prisma/client";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  tag: Tag;
}

const DeleteDialog = ({ tag }: Props) => {
  const router = useRouter();
  const deleteTag = async () => {
    // make the api DELETE here
    try {
      const response = await fetch(`/api/tags/${tag.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error(
          `Error ${response.status}: ${JSON.stringify(response.body)}`
        );
        return;
      }
      toast.success("Item deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton
            radius="full"
            size="1"
            variant="ghost"
            className="p-0 m-0 opacity-30 hover:opacity-100 hover:cursor-pointer"
            color="red"
          >
            <RiDeleteBin6Line />
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>{`Delete ${tag.tag}`}</AlertDialog.Title>
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
              <Button variant="solid" color="red" onClick={deleteTag}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteDialog;
