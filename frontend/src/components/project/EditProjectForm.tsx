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
import PageTitle from "../common/ui/PageTitle";
import CustomDialog from "../common/ui/CustomDialog";

import type { CreateUpdateProject, Project } from "@/types/Project";
import ImageUploader, { ImageT } from "../common/ui/ImageUploader";
import LoadingTextButton from "../common/ui/LoadingTextButton";
import CustomSwitch from "../common/ui/CustomSwitch";
import CustomLabel from "../common/ui/Label";
import ErrorMessage from "../common/ui/ErrorMessage";
import FormImage from "./project-form/FormImage";
import Status from "./project-form/Status";
import Title from "./project-form/Title";
import Description from "./project-form/Description";
import Pitch from "./project-form/Pitch";
import MainLanguage from "./project-form/MainLanguage";
import TechStack from "./project-form/TechStack";
import GithubRepo from "./project-form/GithubRepo";
import Socials from "./project-form/Socials";
import ProjectFormButtons from "./project-form/ProjectFormButtons";
type Inputs = z.infer<typeof createProjectSchema>;

function EditProjectForm({ project }: { project: Project }) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const isOwner = userId === project.owner._id;
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImageT | null>(null);

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
        <Status control={control} />

        {/* Title */}
        <Title control={control} errors={errors} />

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

        <ProjectFormButtons
          isSubmitting={isSubmitting}
          handleDeleteProject={handleDeleteProject}
          error={error}
        />
      </form>
    </div>
  );
}

export default EditProjectForm;
