import { IconButton } from "@radix-ui/themes";
import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

// Use forwardRef and spread props
const EditButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    // @ts-ignore
    <IconButton
      radius="full"
      size="1"
      variant="ghost"
      className="opacity-30 hover:opacity-100 hover:cursor-pointer"
      ref={ref}
      {...props}
    >
      <MdOutlineModeEdit />
    </IconButton>
  );
});

EditButton.displayName = "EditButton";

export default EditButton;
