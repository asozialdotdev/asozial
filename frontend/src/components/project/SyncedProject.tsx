"use client";
import { Project } from "@/types/Project";
import CustomLabel from "../common/ui/Label";
import { useFormState } from "react-dom";
import { syncGithubRepo } from "@/actions";
import { useEffect, useRef } from "react";
import ErrorMessage from "../common/ui/ErrorMessage";
import SyncRepoButton from "./SyncRepoButton";
import SyncedProjectForm from "./SyncedProjectForm";
import { Input } from "../ui/input";

function SyncedProject({ project }: { project: Project }) {
  const [formState, action] = useFormState(syncGithubRepo, {
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);
  console.log(formState.data, "formState");

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
    }
  }, [formState]);
  return (
    <div className="mt-6 flex w-full flex-col gap-2">
      <form
        ref={formRef}
        action={async (formData) => {
          if (formState.success) {
            formRef.current?.reset();
          }
          action(formData);
        }}
        className="flex w-full flex-col gap-2"
      >
        <CustomLabel required htmlFor="githubRepo">
          Github Repository
        </CustomLabel>

        <Input
          type="text"
          name="repo"
          placeholder="Let us know your Github repository"
          className="h-12 w-[20rem] lg:w-[25rem]"
        />
        <SyncRepoButton />
        {formState.errors?.repo && (
          <ErrorMessage>{formState.errors?.repo.join(", ")}</ErrorMessage>
        )}
      </form>
      {formState.success && (
        <SyncedProjectForm project={project} syncedData={formState.data} />
      )}
    </div>
  );
}

export default SyncedProject;
