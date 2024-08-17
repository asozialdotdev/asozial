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
import type { ProjectPost, ProjectPostId, ReplyId } from "@/types/Post";

type ReplyFormProps = {
  projectPostId: ProjectPostId;
  parentId?: ReplyId;
  startOpen: boolean;
};

function ReplyForm({ projectPostId, parentId, startOpen }: ReplyFormProps) {
  const [open, setOpen] = useState<boolean>(startOpen);

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

  const toggleOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <section className={`${startOpen ? "w-full py-4" : "w-[120%] -mt-4"}`}>
      {!open ? (
        <Button variant="outline" className="text-base" onClick={toggleOpen}>
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

          <ButtonReplyForm toggleOpen={toggleOpen} startOpen={startOpen} />
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
