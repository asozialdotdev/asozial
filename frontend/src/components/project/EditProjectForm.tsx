"use client";
//Next
import { useRouter } from "next/navigation";

//React
import { useState } from "react";

//Actions
import { deleteProject, updateProject } from "@/actions";

//Hooks
import { ControllerRenderProps } from "react-hook-form";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";
//Lib
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/lib/schema";

//Components
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

import type { CreateUpdateProject, Inputs, Project } from "@/types/Project";
import { ImageT } from "../common/ui/ImageUploader";

function EditProjectForm({ project }: { project: Project }) {
  const username = project.owner.username;
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImageT | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { spokenLanguages } = useSpokenLanguages();

  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
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
    const { title, description, pitch, socials, techStack } = data;
    console.log(data);

    const formattedTitle = title.trim();
    const formattedDescription = description.trim();
    const formattedPitch = pitch.trim();
    const formattedTechStack = techStack?.filter((item) => item !== null) || [];
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
      techStack: formattedTechStack,
      image,
      placeholder,
    };
    console.log(finalData);
    const result = await updateProject(project._id, finalData);

    if (result === "Error updating project") {
      console.error("Error updating project");
      setError("Error updating project. Please try again");
    } else {
      router.push(`/${username}/${project.slug}/${project._id}`);
    }
  };

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const result = await deleteProject(project._id);
    if (result.error) {
      console.error("Error deleting project");
      setError(result.message);
      setIsDeleting(false);
    } else {
      router.push(`/projects`);
      setIsDeleting(false);
    }
  };

  console.log("erros", errors.techStack)

  return (
    <div className="w-full pb-6">
      {/* Title */}
      <Title errors={errors} setValue={setValue} editTitle={project.title} />
      <form
        onSubmit={handleSubmit(processForm)}
        className="mt-2 flex w-full flex-col gap-2"
      >
        {/* Image */}
        <FormImage setUploadedImage={setUploadedImage} image={uploadedImage} />

        {/* Status */}
        <Status control={control} />

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
        <ProjectFormButtons
          isSubmitting={isSubmitting}
          isDeleting={isDeleting}
          handleDeleteProject={handleDeleteProject}
          error={error}
          edit
        />
      </form>
    </div>
  );
}

export default EditProjectForm;
