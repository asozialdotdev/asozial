"use client";
import { mainLanguageSchema } from "@/lib/schema";
import { Project } from "@/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";
import { patchMainLanguage } from "@/actions";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import CustomLabel from "../common/ui/Label";

type Input = z.infer<typeof mainLanguageSchema>;

function ProjectMainLanguage({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { spokenLanguages } = useSpokenLanguages();
  const session = useSession();
  const {
    handleSubmit,

    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(mainLanguageSchema),
    defaultValues: {
      mainLanguage: "",
    },
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const processForm = async (data: Input) => {
    const result = await patchMainLanguage(project._id, data.mainLanguage);
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
      className={`${project.mainLanguage ? "h-auto" : "h-[9rem]"} mt-4 flex flex-col gap-2`}
    >
      {!isEditing ? (
        <>
          <h4 className="text-lg font-semibold">Language</h4>
          {!project.mainLanguage ? (
            <div>
              <p className="mb-4 text-justify text-base font-light text-neutral-500 dark:text-neutral-400">
                {isOwner
                  ? "Here you can add the main language of your project"
                  : "No language provided yet."}
              </p>
              {isOwner && (
                <Button
                  className="bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
                  onClick={toggleEditing}
                >
                  Add Language
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="capitalize">{project.mainLanguage}</p>
            </>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit(processForm)}
          className="flex flex-col gap-2"
        >
          <CustomLabel htmlFor="mainLanguage">Language</CustomLabel>
          <Controller
            name="mainLanguage"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name="mainLanguage"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent id="mainLanguage">
                  {spokenLanguages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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

          {(errors.mainLanguage || error) && (
            <span className="text-base font-light text-red-700 dark:text-red-700">
              {errors?.mainLanguage?.message || error}
            </span>
          )}
        </form>
      )}
    </div>
  );
}

export default ProjectMainLanguage;
