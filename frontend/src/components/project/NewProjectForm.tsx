"use client";

//React
import { useState } from "react";
//Actions
import { createProject } from "@/actions";

//Hooks
import { ControllerRenderProps } from "react-hook-form";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";

//Ui

//Lib
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/lib/schema";
import { z } from "zod";

//Components
import FormImage from "./project-form/FormImage";
import Title from "./project-form/Title";
import Description from "./project-form/Description";
import Pitch from "./project-form/Pitch";
import MainLanguage from "./project-form/MainLanguage";
import TechStack from "./project-form/TechStack";
import GithubRepo from "./project-form/GithubRepo";
import Socials from "./project-form/Socials";
import ProjectFormButtons from "./project-form/ProjectFormButtons";

//Types
import type { CreateUpdateProject, Inputs } from "@/types/Project";
import { ImageT } from "../common/ui/ImageUploader";

function NewProjectForm() {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImageT | null>(null);
  const { spokenLanguages, isLoadingSpokenLanguages, errorSpokenLanguages } =
    useSpokenLanguages();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      pitch: "",
      githubRepo: "",
      techStack: [],
      mainLanguage: "",
      socials: {
        slack: "",
        discord: "",
        notion: "",
        gitlab: "",
      },
      image: "",
      placeholder: "",
    },
  });

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
    console.log("finalData", finalData);
    const result = await createProject(finalData);
    if (result?.error) {
      console.error("Error creating project");
      setError("Error creating project. Please try again");
    } else {
      reset();
    }
  };

  return (
    <div className="w-full pb-6">
      {/* Title */}
      <Title errors={errors} setValue={setValue} />
      <form
        onSubmit={handleSubmit(processForm)}
        className="mt-2 flex w-full flex-col gap-2"
      >
        {/* Image */}
        <FormImage setUploadedImage={setUploadedImage} image={uploadedImage} />

        {/* Description */}
        <Description control={control} errors={errors} />

        {/* Pitch */}
        <Pitch control={control} errors={errors} />

        {/* Main Language */}
        <MainLanguage
          control={control}
          errors={errors}
          spokenLanguages={spokenLanguages}
        />

        {/* Tech Stack */}
        <TechStack
          control={control}
          errors={errors}
          watch={watch}
          handleCheckedChange={handleCheckedChange}
        />

        {/* Github Repo */}
        <GithubRepo control={control} />

        {/* Socials */}
        <Socials control={control} />

        {/* Buttons */}
        <ProjectFormButtons isSubmitting={isSubmitting} error={error} />
      </form>
    </div>
  );
}

export default NewProjectForm;
