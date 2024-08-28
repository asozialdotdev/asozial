"use client";

import { useFormState } from "react-dom";
import { leaveProject } from "@/actions";

import LeaveButton from "./LeaveButton";

import { Project } from "@/types/Project";
import CustomLabel from "@/components/common/ui/Label";
import ErrorMessage from "@/components/common/ui/ErrorMessage";

function LeaveProjectForm({ project }: { project: Project }) {
  const [formState, action] = useFormState(leaveProject, {
    errors: {},
  });
  const errors = formState.errors?.leave;
  return (
    <form className="flex w-full items-end justify-end" action={action}>
      <CustomLabel htmlFor="leave"></CustomLabel>
      <input type="hidden" name="projectId" value={project._id.toString()} />
      <LeaveButton />
      {errors && <ErrorMessage>{errors.join(", ")}</ErrorMessage>}
    </form>
  );
}

export default LeaveProjectForm;
