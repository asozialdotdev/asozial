"use client";
import { Member, Project } from "@/types/Project";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { descriptionSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchDescription } from "@/actions";
import { useSession } from "next-auth/react";
import CustomLabel from "../common/ui/Label";

type Input = z.infer<typeof descriptionSchema>;

function ProjectDescription({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: "",
    },
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const processForm = async (data: Input) => {
    const result = await patchDescription(project._id, data.description);
    if (result.error) {
      setError(result.message);
      return;
    } else {
      toggleEditing();
    }
  };

  const isOwner = project.owner._id === session.data?.user?.id;

  return (
    <div
      className={`${project.description ? "h-auto" : "h-[10rem]"} mt-4 flex flex-col gap-2`}
    >
      {!isEditing ? (
        <>
          <h4 className="text-lg font-semibold">Description</h4>
          {project.description ? (
            <h3 className="font-semibold text-zinc-500 first-letter:capitalize dark:text-zinc-400">
              {project.description}
            </h3>
          ) : isOwner ? (
            <div>
              <p className="mb-4 text-justify text-base font-light text-neutral-500 dark:text-neutral-400">
                No description provided yet. Describe your project to attract
                more members.
              </p>
              <Button
                className="bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
                onClick={toggleEditing}
              >
                Add a description
              </Button>
            </div>
          ) : (
            <p className="mb-4 text-justify text-base font-light text-neutral-500 dark:text-neutral-400">
              No description provided yet.
            </p>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit(processForm)}
          className="mb-4 flex w-full flex-col gap-2"
        >
          <CustomLabel htmlFor="description">Description</CustomLabel>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="What's on your mind?"
            className="h-20 w-full"
          />
          <div className="flex items-center gap-4">
            <Button
              disabled={!isValid || isSubmitting}
              className="bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
            >
              {isSubmitting ? "Saving" : "Save"}
            </Button>

            <Button
              type="button"
              onClick={toggleEditing}
              variant="outline"
              className="hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
            >
              Cancel
            </Button>
          </div>
          {(errors.description || error) && (
            <span className="text-base font-light text-red-700 dark:text-red-700">
              {errors?.description?.message || error}
            </span>
          )}
        </form>
      )}
    </div>
  );
}

export default ProjectDescription;
