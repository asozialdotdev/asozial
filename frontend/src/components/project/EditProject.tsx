"use client";
//Next
import { useRouter } from "next/navigation";
import Image from "next/image";

//Actions
import { updateProject } from "@/actions";

//Hooks
import { ControllerRenderProps } from "react-hook-form";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";

//Ui
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import github from "/public/socials/github.png";

//Lib
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/lib/schema";
import { z } from "zod";
import { languagesWithColors, socialsData } from "@/constants";

//Components
import PageTitle from "../common/PageTitle";
import type { CreateUpdateProject, Project } from "@/types/Project";
import { useState } from "react";

type Inputs = z.infer<typeof createProjectSchema>;

function EditProjectForm({ project }: { project: Project }) {
  const [error, setError] = useState<string | null>(null);

  const { spokenLanguages, isLoadingSpokenLanguages, errorSpokenLanguages } =
    useSpokenLanguages();

  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      pitch: project.pitch,
      githubRepo: project.githubRepo,
      techStack: project.techStack,
      mainLanguage: project.mainLanguage,
      socials: project.socials,
    },
  });

  const techStackValues = watch("techStack");

  const handleCheckedChange = (
    checked: boolean | string,
    field: ControllerRenderProps<Inputs, "techStack">,
    language: string,
  ) => {
    const newValue = [...field.value];
    if (checked) {
      newValue.push(language);
    } else {
      const index = newValue.indexOf(language);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    }
    field.onChange(newValue);
    setValue("techStack", newValue);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log("form data");
    const { title, description, pitch, socials } = data;

    const formattedTitle = title.trim();
    const formattedDescription = description.trim();
    const formattedPitch = pitch.trim();
    const formattedSocials = socials?.map((social) => social.trim());

    const finalData: CreateUpdateProject = {
      ...data,
      title: formattedTitle,
      description: formattedDescription,
      pitch: formattedPitch,
      socials: formattedSocials,
    };
    const result = await updateProject(project._id, finalData);

    if (result === "Error updating project") {
      console.error("Error updating project");
      setError("Error updating project. Please try again");
    } else {
      router.push(`/projects/${project._id}`);
    }
  };

  return (
    <div className="w-full">
      <PageTitle className="text-center">
        Edit Project {project.title}
      </PageTitle>
      <form
        onSubmit={handleSubmit(processForm)}
        className="mt-2 flex w-full flex-col gap-2"
      >
        {/* Title */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            Title <span className="text-xl text-red-400">*</span>
          </label>

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="title"
                name="title"
                placeholder="The title of your project"
                className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
              />
            )}
          />

          {errors.title && (
            <span className="text-sm font-light text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold">
            Description <span className="text-xl text-red-400">*</span>
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="description"
                name="description"
                placeholder="What is your project about?"
                className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
              />
            )}
          />

          {errors.description && (
            <span className="text-sm font-light text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Pitch */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="pitch" className="font-semibold">
            Pitch <span className="text-xl text-red-400">*</span>
          </label>

          <Controller
            name="pitch"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="pitch"
                name="pitch"
                placeholder="Describe what is your project about and why other members should join it..."
                className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
              />
            )}
          />

          {errors.pitch && (
            <span className="text-sm font-light text-red-500">
              {errors.pitch.message}
            </span>
          )}
        </div>

        {/* TechStack */}
        <div className="flex flex-col gap-2">
          <label htmlFor="mainLanguage" className="font-semibold">
            Language <span className="text-xl text-red-400">*</span>
          </label>
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

          {errors.mainLanguage && (
            <span className="text-sm font-light text-red-500">
              {errors.mainLanguage.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-semibold">
            Tech Stack <span className="text-xl text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 items-center gap-3">
            {languagesWithColors.map((stack) => (
              <div key={stack.language} className="flex items-center gap-2">
                <Controller
                  name="techStack"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={stack.language}
                      checked={techStackValues.includes(stack.language)}
                      onCheckedChange={(checked) =>
                        handleCheckedChange(checked, field, stack.language)
                      }
                    />
                  )}
                />
                <label
                  htmlFor={stack.language}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {stack.language}
                </label>
              </div>
            ))}
          </div>

          {errors.techStack && (
            <span className="text-sm font-light text-red-500">
              {errors.techStack.message}
            </span>
          )}
        </div>

        {/* Github Repo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gitHubRepo" className="font-semibold"></label>
          <label htmlFor="socials" className="font-semibold">
            Socials
          </label>

          <div className="flex flex-col gap-2">
            <Image
              src={github}
              alt="Github"
              width={30}
              height={30}
              className="inline dark:invert dark:filter"
            />

            <Input
              type="text"
              id="githubRepo"
              placeholder="https://github.com/username/repo"
              className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
            />
          </div>
        </div>

        {/* Socials */}

        <div className="flex flex-col gap-2">
          {socialsData.map((social, index) => (
            <div key={index} className="mt-6 flex flex-col gap-2">
              <Image
                src={social.imageSrc}
                alt={social.alt}
                width={social.alt === "Notion" ? 25 : 60}
                height={social.alt === "Notion" ? 25 : 60}
                className="inline"
              />
              <Controller
                name={`socials.${index}`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id={`socials.${index}`}
                    placeholder={social.placeholder}
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                )}
              />
            </div>
          ))}
        </div>

        {error && (
          <span className="text-base font-light text-red-500">{error}</span>
        )}
        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="my-2 bg-dark dark:bg-light"
        >
          {isSubmitting ? "Updating" : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default EditProjectForm;
