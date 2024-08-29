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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
import ReplyIcon from "../common/ui/icons/ReplyIcon";

type ReplyFormProps = {
  projectPostId: ProjectPostId;
  parentId?: ReplyId | null;
  reply?: Reply;
  startOpen: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function ReplyForm({
  projectPostId,
  parentId,
  reply,
  startOpen,
  open,
  setOpen,
}: ReplyFormProps) {
  const [formState, action] = useFormState(
    createProjectPostReply.bind(null, { projectPostId, parentId }),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  const toggleOpen = useCallback(() => {
    setOpen((prev: boolean) => !prev);
  }, [setOpen]);
  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();

      if (!startOpen) {
        toggleOpen();
      }
    }
  }, [formState, startOpen, toggleOpen]);

  return (
    <section className={`${startOpen ? "w-full py-4" : "-mt-4 w-full"}`}>
      {!open ? (
        <div className="mt-4 flex items-start gap-4">
          <div>
            <ReplyLikeButtons reply={reply} />
          </div>
          <div>
            <ReplyIcon toggleOpen={toggleOpen} />
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          action={action}
          className="mt-4 flex w-full flex-col gap-4 pb-4 md:w-[200%] lg:w-[300%]"
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

          <ReplyFormButton
            toggleOpen={toggleOpen}
            startOpen={startOpen}
            edit={false}
          />
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
