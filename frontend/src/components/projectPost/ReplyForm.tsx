"use client";
//Actions
import { createProjectPostReply } from "@/actions";

//Hooks
import { useFormState } from "react-dom";

//Components
import ReplyFormButton from "./ReplyFormButton";
import ReplyLikeButtons from "./ReplyLikeButtons";

//Ui
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { GoComment } from "react-icons/go";

//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";

type ReplyFormProps = {
  projectPostId: ProjectPostId;
  parentId?: ReplyId | null;
  reply?: Reply
  startOpen: boolean;
};

function ReplyForm({
  projectPostId,
  parentId,
  reply,
  startOpen,
}: ReplyFormProps) {
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
    <section className={`${startOpen ? "w-full py-4" : "-mt-4 w-[120%]"}`}>
      {!open ? (
        <div className="mt-4 flex items-baseline gap-4">
          <ReplyLikeButtons reply={reply} />
          <button
            className="flex items-center gap-2 text-sm"
            onClick={toggleOpen}
          >
            <span>
              <GoComment size={20} />
            </span>
            Reply
          </button>
        </div>
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

          <ReplyFormButton toggleOpen={toggleOpen} startOpen={startOpen} />
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
