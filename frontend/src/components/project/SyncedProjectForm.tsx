"use client";
//Next
import { useRouter } from "next/navigation";
import Image from "next/image";

//React
import { useState } from "react";

//Actions
import { deleteProject, updateProject } from "@/actions";

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
import { useSession } from "next-auth/react";

// Constants
import { languagesWithColors, projectStatus, socialsData } from "@/constants";

//Components
import CustomDialog from "../common/ui/CustomDialog";
import ImageUploader, { ImageT } from "../common/ui/ImageUploader";
import LoadingTextButton from "../common/ui/LoadingTextButton";

//Types
import type { CreateUpdateProject, Project } from "@/types/Project";
import ErrorMessage from "../common/ui/ErrorMessage";
import CustomLabel from "../common/ui/Label";
import FormImage from "./project-form/FormImage";
type Inputs = z.infer<typeof createProjectSchema>;

type SyncedProjectFormProps = {
  project: Project;
  syncedData: any;
};

function SyncedProjectForm({ project, syncedData }: SyncedProjectFormProps) {
  const { name, html_url, description, language } = syncedData;
  const session = useSession();
  const userId = session?.data?.user?.id;
  const isOwner = userId === project.owner._id;
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImageT | null>(null);

  const { spokenLanguages } = useSpokenLanguages();

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
      title: name,
      description: description,
      pitch: project.pitch,
      githubRepo: html_url,
      techStack: language ? [language] : [],
      mainLanguage: project.mainLanguage,
      socials: project.socials,
      status: project.status,
      image: project.image,
      placeholder: project.placeholder,
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
    const { title, description, pitch, socials } = data;

    const formattedTitle = title.trim();
    const formattedDescription = description.trim();
    const formattedPitch = pitch.trim();
    const formattedSocials = socials
      ? Object.entries(socials).reduce((acc, [key, value]) => {
          acc[key] = value?.trim() || "";
          return acc;
        }, {} as any)
      : {};

    const image = uploadedImage?.url || "";
    const placeholder = uploadedImage?.placeholder || "";
    setValue("image", image);
    setValue("placeholder", placeholder);

    const finalData: CreateUpdateProject = {
      ...data,
      title: formattedTitle,
      description: formattedDescription,
      pitch: formattedPitch,
      socials: formattedSocials,
      image,
      placeholder,
    };
    const result = await updateProject(project._id, finalData);

    if (result === "Error updating project") {
      console.error("Error updating project");
      setError("Error updating project. Please try again");
    } else {
      router.push(`/projects/${project._id}`);
    }
  };

  const image = watch("image");
  console.log("image", image);
  console.log("uploadedImage", uploadedImage);

  const handleDeleteProject = async () => {
    const result = await deleteProject(project._id);
    if (result.error) {
      console.error("Error deleting project");
      setError(result.message);
    } else {
      router.push("/projects");
    }
  };

  return (
    <div className="w-full pb-6">
      <form
        onSubmit={handleSubmit(processForm)}
        className="mt-2 flex w-full flex-col gap-2"
      >
        {/* Image */}
        <FormImage setUploadedImage={setUploadedImage} />

        {/* Status */}
        <div className="mt-6 flex flex-col gap-2">
          <CustomLabel htmlFor="status" required>
            Status
          </CustomLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name="status"
              >
                <SelectTrigger className="w-[180px] capitalize">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent id="status">
                  {projectStatus.map((s) => (
                    <SelectItem className="capitalize" key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {/* Title */}
        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="title" required>
            Title
          </CustomLabel>

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

          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        {/* Description */}
        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="description" required>
            Description
          </CustomLabel>
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
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        {/* Pitch */}
        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="pitch" required>
            Pitch
          </CustomLabel>

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

          {errors.pitch && <ErrorMessage>{errors.pitch.message}</ErrorMessage>}
        </div>

        {/* Main Language */}
        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="mainLanguage" required>
            Language
          </CustomLabel>
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
                  {spokenLanguages.map((language, i) => (
                    <SelectItem key={language + i} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.mainLanguage && (
            <ErrorMessage>{errors.mainLanguage.message}</ErrorMessage>
          )}
        </div>

        {/* Tech Stack */}

        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="techStack" required>
            Tech Stack
          </CustomLabel>
          <div className="mt-2 grid grid-cols-3 items-center gap-3">
            {languagesWithColors.map((stack, i) => (
              <div key={stack.language + i} className="flex items-center gap-2">
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
            <ErrorMessage>{errors.techStack.message}</ErrorMessage>
          )}
        </div>

        {/* Github Repo */}
        <div className="mt-4 flex flex-col gap-2">
          <CustomLabel htmlFor="gitHubRepo"></CustomLabel>
          <CustomLabel htmlFor="socials">Socials</CustomLabel>

          <div className="flex flex-col gap-2">
            <Image
              src={github}
              alt="Github"
              width={30}
              height={30}
              className="inline dark:invert dark:filter"
            />
            <Controller
              name="githubRepo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="githubRepo"
                  placeholder="https://github.com/username/repo"
                  className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                />
              )}
            />
          </div>
        </div>

        {/* Socials */}

        <div className="flex flex-col gap-2">
          {socialsData.map((social) => (
            <div key={social.key} className="mt-6 flex flex-col gap-2">
              <Image
                src={social.imageSrc}
                alt={social.alt}
                width={30}
                height={30}
                className="inline"
              />
              <Controller
                name={`socials.${social.key}` as any}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id={`socials.${social.key}`}
                    placeholder={social.placeholder}
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                )}
              />
            </div>
          ))}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="my-2 bg-dark dark:bg-light"
        >
          {isSubmitting ? <LoadingTextButton text="Updating" /> : "Update"}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CustomDialog
          title="Are you sure?"
          description="There's no turning back once you delete this project"
          handler={handleDeleteProject}
          trigger={
            <Button
              onClick={handleDeleteProject}
              variant={"destructive"}
              className="mt-2 w-full"
            >
              Delete Project
            </Button>
          }
          asChild
        />
      </form>
    </div>
  );
}

export default SyncedProjectForm;
