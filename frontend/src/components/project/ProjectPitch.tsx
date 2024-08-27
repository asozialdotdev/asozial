"use client";
import { Member, Project } from "@/types/Project";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { pitchSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchPitch } from "@/actions";
import { useSession } from "next-auth/react";

type Input = z.infer<typeof pitchSchema>;

function ProjectPitch({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(pitchSchema),
    defaultValues: {
      pitch: "",
    },
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const processForm = async (data: Input) => {
    const result = await patchPitch(project._id, data.pitch);
    if (result.error) {
      setError(result.message);
      return;
    } else {
      toggleEditing();
    }
  };

  const isOwner = project.owner._id === session.data?.user?.id;
  console.log("project Pitch", project.pitch);

  return (
    <div
      className={`${project.pitch ? "h-auto" : "h-[12rem]"} mt-4 flex flex-col gap-2`}
    >
      {!isEditing ? (
        <>
          <h4 className="text-lg font-semibold">Pitch</h4>
          {project.pitch ? (
            <p className="text-justify text-base font-light">{project.pitch}</p>
          ) : isOwner ? (
            <div>
              <p className="mb-4 text-justify text-base font-light text-neutral-500 dark:text-neutral-400">
                No pitch provided yet. Here you should tell everyone why they
                should join your project.
              </p>
              <Button
                className="bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
                onClick={toggleEditing}
              >
                Add a pitch
              </Button>
            </div>
          ) : (
            <p className="mb-4 text-justify text-base font-light text-neutral-500 dark:text-neutral-400">
              No pitch provided yet. Ask the owner for more information.
            </p>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit(processForm)}
          className="mb-4 flex w-full flex-col gap-2"
        >
          <label
            className="font-semibold text-zinc-500 dark:text-zinc-400"
            htmlFor="pitch"
          >
            Pitch
          </label>
          <Textarea
            id="pitch"
            {...register("pitch")}
            placeholder="What's on your mind?"
            className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
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
          {(errors.pitch || error) && (
            <span className="text-base font-light text-red-700 dark:text-red-700">
              {errors?.pitch?.message || error}
            </span>
          )}
        </form>
      )}
    </div>
  );
}

export default ProjectPitch;
