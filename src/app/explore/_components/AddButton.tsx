import React from "react";
import { IconButton } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";

// This allows it to be used as a valid Radix Trigger child
const AddButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => (
  // @ts-ignore
  <IconButton radius="full" size="3" {...props} ref={ref}>
    <MdAdd size={25} />
  </IconButton>
));

AddButton.displayName = "AddButton";

export default AddButton;
