"use client";

import { Button } from "../ui/button";
import { createMessage } from "@/actions/message.server/createMessage.server";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "../common/ui/ErrorMessage";
import CustomLabel from "../common/ui/Label";
import MessageFormButton from "./MessageFormButton";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { FriendshipId } from "@/types/Friendship";

function MessageInput({ friendshipId }: { friendshipId: FriendshipId }) {
  const [formState, action] = useFormState(
    createMessage.bind(null, friendshipId),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
    }
  }, [formState]);

  return (
    <form ref={formRef} action={action} className="mt-2">
      <div className="mt-6 flex w-full flex-col gap-2">
        <CustomLabel required htmlFor="content">
          Message
        </CustomLabel>

        <Textarea
          name="content"
          placeholder="undefined"
          className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
        />

        {formState.errors?.content && (
          <ErrorMessage>{formState.errors?.content.join(", ")}</ErrorMessage>
        )}
      </div>

      <MessageFormButton editing={false} />
    </form>
  );
}

export default MessageInput;
