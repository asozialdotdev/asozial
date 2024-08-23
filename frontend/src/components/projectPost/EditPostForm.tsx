"use client";

//Actions
import { createProjectPost, updateProjectPost } from "@/actions";
//Hooks
import { useFormState } from "react-dom";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

//Components
import ProjectPostFormButton from "../project/ProjectPostFormButton";

//Ui
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { ProjectId } from "@/types/Project";
import { ProjectPost } from "@/types/ProjectPost";
import ImageUploader, { ImageT } from "../common/ui/ImageUploader";

type EditPostFormProps = {
  projectPost: ProjectPost;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  image?: ImageT;
  setImage: Dispatch<SetStateAction<ImageT | undefined>>;
};

function EditPostForm({ projectPost, setIsEditing, image, setImage }: EditPostFormProps) {
  const postId = projectPost._id;
  const [formState, action] = useFormState(
    updateProjectPost.bind(null, postId),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  console.log("formState", formState.success);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setIsEditing(false);
    }
  }, [formState, setIsEditing]);
  return (
    <form ref={formRef} className="w-full" action={action}>
      <div className="flex w-full flex-col gap-2">
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
          defaultValue={projectPost.title}
          className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
        />

        {formState.errors?.title && (
          <span className="text-sm font-light text-red-500">
            {formState.errors?.title.join(", ")}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          className="font-semibold text-zinc-500 dark:text-zinc-400"
          htmlFor="content"
        >
          Content <span className="text-xl text-red-400">*</span>
        </label>
        <Textarea
          name="content"
          placeholder="What's on your mind?"
          defaultValue={projectPost.content}
          className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
        />
        {formState.errors?.content && (
          <span className="text-sm font-light text-red-500">
            {formState.errors?.content.join(", ")}
          </span>
        )}

        <div>
          <input type="hidden" name="image" value={image ? image.url : ""} />
          <input
            type="hidden"
            name="placeholder"
            value={image ? image.placeholder : ""}
          />
          <ImageUploader
            variant="outline"
            onUploadSucess={setImage}
            edit
            className="my-1"
          />
        </div>
      </div>

      <ProjectPostFormButton editing />
    </form>
  );
}

export default EditPostForm;
