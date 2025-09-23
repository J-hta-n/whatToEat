"use client";

import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsDiscord } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

interface Props {
  redirectUri: string;
}
const SignInDialog = ({ redirectUri }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button size="2" onClick={() => setIsDialogOpen(true)}>
            Login
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="h-2/5">
          <Dialog.Title className="pt-2 pb-2 relative">
            <Flex align="center" justify="between">
              {/* Invisible spacer on the left to balance the right button */}
              <div style={{ width: 30 }} />
              <p className="text-center flex-1 mt-2">
                Log in to personalise your data
              </p>
              {/* Close button on right */}
              <IconButton
                radius="full"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close"
              >
                <MdCancel size={25} />
              </IconButton>
            </Flex>
          </Dialog.Title>
          <div className="flex flex-col gap-3 justify-center items-center h-3/5">
            {/* Google button */}
            <button
              onClick={() => signIn("google", { callbackUrl: redirectUri })}
              className="flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out active:scale-95"
            >
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>

            {/* Discord button */}
            <button
              onClick={() => signIn("discord", { callbackUrl: redirectUri })}
              className="flex items-center gap-3 px-5 py-2.5 bg-[#5865F2] border border-[#5865F2] rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out active:scale-95 text-white"
            >
              <BsDiscord size={22} />
              <span className="font-medium">Sign in with Discord</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default SignInDialog;
