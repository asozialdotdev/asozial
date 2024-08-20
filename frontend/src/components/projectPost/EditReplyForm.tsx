"use client";
import { useEffect, useRef, useState } from "react";
import ReplyLikeButtons from "./ReplyLikeButtons";
import { GoComment } from "react-icons/go";
import { Textarea } from "../ui/textarea";
import ReplyFormButton from "./ReplyFormButton";
import { useFormState } from "react-dom";
import { updatePostReply } from "@/actions";
import { ProjectPostId, Reply } from "@/types/ProjectPost";

type EditReplyFormProps = {
  reply: Reply;
  projectPostId: ProjectPostId;
  startOpen: boolean;
  edit: boolean;
  toggleEdit: () => void;
};

function EditReplyForm({
  reply,
  projectPostId,
  startOpen,
  edit,
  toggleEdit,
}: EditReplyFormProps) {
  const replyId = reply._id?.toString();

  const [formState, action] = useFormState(
    updatePostReply.bind(null, { projectPostId, replyId }),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      toggleEdit();
    }
  }, [formState, toggleEdit]);

  return (
    <section className={`${startOpen ? "w-full py-4" : "-mt-4 w-[120%]"}`}>
      {!edit ? null : (
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
            defaultValue={reply.content}
          />
          {formState.errors?.content && (
            <span className="text-sm font-light text-red-500">
              {formState.errors?.content.join(", ")}
            </span>
          )}

          <ReplyFormButton toggleOpen={toggleEdit} startOpen={startOpen} edit />
        </form>
      )}
    </section>
  );
}

export default EditReplyForm;
