"use client";
//Next
import Image from "next/image";
//Actions
import { createProjectPost } from "@/actions";
//Hooks
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";

//Components
import ProjectPostFormButton from "./ProjectPostFormButton";
import ImageUploader, { ImageT } from "../common/ui/ImageUploader";

//Ui
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

//Types
import type { ProjectId } from "@/types/Project";
import ErrorMessage from "../common/ui/ErrorMessage";

function PostForm({ projectId }: { projectId: ProjectId }) {
  const [uploadImage, setUploadImage] = useState<ImageT | null>(null);
  const [formState, action] = useFormState(
    createProjectPost.bind(null, projectId),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  console.log("formState", formState.success);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setUploadImage(null);
    }
  }, [formState]);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        if (formState.success) {
          formRef.current?.reset();
        }
        action(formData);
      }}
      className="mt-2"
    >
      <div className="mt-6 flex w-full flex-col gap-2">
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
          <ErrorMessage>{formState.errors?.title.join(", ")}</ErrorMessage>
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

      <div>
        <input
          type="hidden"
          name="image"
          value={uploadImage ? uploadImage.url : ""}
        />
        <input
          type="hidden"
          name="placeholder"
          value={uploadImage ? uploadImage.placeholder : ""}
        />
        <ImageUploader
          variant="outline"
          onUploadSucess={setUploadImage}
          className="my-1"
        />
        <div>
          {uploadImage && (
            <Image
              src={uploadImage.url}
              alt="uploaded-image"
              width={600}
              height={600}
              blurDataURL={uploadImage.placeholder}
              className="mt-4 rounded-md"
            />
          )}
        </div>
      </div>

      <ProjectPostFormButton editing={false} />
    </form>
  );
}

export default PostForm;
