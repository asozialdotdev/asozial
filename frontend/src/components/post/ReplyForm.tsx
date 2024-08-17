"use client";
//Actions
import { createProjectPostReply } from "@/actions";

//Hooks
import { useFormState } from "react-dom";

//Components
import ButtonReplyForm from "./ButtonReplyForm";

//Ui
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";

//Types
import type { Post } from "@/types/Post";

type ReplyFormProps = {
  post: Post;
};

function ReplyForm({ projectPostId, parentId, startOpen }: ReplyFormProps) {
  const [open, setOpen] = useState(startOpen);

  const [formState, action] = useFormState(
    createProjectPostReply.bind(null, { projectPostId, parentId }),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  return (
    <section className="w-full py-4">
      {!open ? (
        <Button
          className="text-base font-semibold"
          onClick={() => setOpen(!open)}
        >
          Reply
        </Button>
      ) : (
        <form
          ref={formRef}
          action={action}
          className="mt-4 flex flex-col gap-4"
        >
          <label htmlFor="content"></label>
          <Textarea
            name="content"
            className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
            placeholder="Reply to this post..."
          />
          {formState.errors?.content && (
            <span className="text-sm font-light text-red-500">
              {formState.errors?.content.join(", ")}
            </span>
          )}

          <ButtonReplyForm setOpen={setOpen} />
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
