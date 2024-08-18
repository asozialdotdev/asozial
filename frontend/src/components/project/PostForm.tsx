"use client";

//Actions
import { createProjectPost } from "@/actions";
//Hooks
import { useFormState } from "react-dom";
import { useRef } from "react";

//Components
import ButtonProjectPostForm from "./ButtonProjectPostForm";

//Ui
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { ProjectId } from "@/types/Project";

function PostForm({ projectId }: { projectId: ProjectId }) {
  const [formState, action] = useFormState(
    createProjectPost.bind(null, projectId),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="mt-2"
      action={async (formData) => {
        if (formState.success) {
          formRef.current?.reset();
        }
        action(formData);
      }}
    >
      <div className="mt-6 flex flex-col gap-2">
        <label
          className="font-semibold text-zinc-500 dark:text-zinc-400"
          htmlFor="title"
        >
          Title <span className="text-xl text-red-400">*</span>
        </label>

        <Input
          type="text"
          name="title"
          placeholder="An awesome title to start a discussion"
          className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
        />

        {formState.errors?.title && (
          <span className="text-sm font-light text-red-500">
            {formState.errors?.title.join(", ")}
          </span>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <label
          className="font-semibold text-zinc-500 dark:text-zinc-400"
          htmlFor="content"
        >
          Content <span className="text-xl text-red-400">*</span>
        </label>
        <Textarea
          name="content"
          placeholder="What's on your mind?"
          className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
        />
        {formState.errors?.content && (
          <span className="text-sm font-light text-red-500">
            {formState.errors?.content.join(", ")}
          </span>
        )}
      </div>

      <input type="hidden" name="projectId" value={projectId.toString()} />

      <ButtonProjectPostForm />
    </form>
  );
}

export default PostForm;
