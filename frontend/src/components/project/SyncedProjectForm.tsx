"use client";
//Next
import { useRouter } from "next/navigation";

//React
import { useEffect, useState } from "react";

//Actions
import { deleteProject, updateProject } from "@/actions";

//Hooks
import { ControllerRenderProps } from "react-hook-form";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";

//Ui

//Componentes
import Status from "./project-form/Status";
import Title from "./project-form/Title";
import Description from "./project-form/Description";
import Pitch from "./project-form/Pitch";
import MainLanguage from "./project-form/MainLanguage";
import TechStack from "./project-form/TechStack";
import GithubRepo from "./project-form/GithubRepo";
import Socials from "./project-form/Socials";
import ProjectFormButtons from "./project-form/ProjectFormButtons";
import FormImage from "./project-form/FormImage";

//Lib
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/lib/schema";

//Types
import type { CreateUpdateProject, Inputs, Project } from "@/types/Project";
import { ImageT } from "../common/ui/ImageUploader";

type SyncedProjectFormProps = {
  project: Project;
  syncedData: any;
};

function SyncedProjectForm({ project, syncedData }: SyncedProjectFormProps) {
  const { name, html_url, description, language } = syncedData;
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

  useEffect(() => {
    setValue("description", description);
    setValue("githubRepo", html_url);
    setValue("techStack", language ? [language] : []);
  }, [syncedData]);

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
    const result = await updateProject(project._id, finalData);

    if (result === "Error updating project") {
      console.error("Error updating project");
      setError("Error updating project. Please try again");
    } else {
      router.push(`/${username}/${project.slug}/${project._id}`);
    }
  };

  const image = watch("image");

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
        <Title
          errors={errors}
          setValue={setValue}
          syncTitle={syncedData.name}
        />

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
          isDeleting={isDeleting}
          isSubmitting={isSubmitting}
          handleDeleteProject={handleDeleteProject}
          error={error}
          edit
        />
      </form>
    </div>
  );
}

export default SyncedProjectForm;
