"use client";
//Actions
import { applyForProject } from "@/actions";

//React
import { useFormState } from "react-dom";

//Components
import CustomLabel from "@/components/common/ui/Label";
import ApplyProjectButton from "./ApplyProjectButton";
import ErrorMessage from "@/components/common/ui/ErrorMessage";

//Types
import { Project } from "@/types/Project";

type ApplyProjectProps = {
  project: Project;
  hasApplied: boolean;
};

function ApplyProject({ project, hasApplied }: ApplyProjectProps) {
  const [formState, action] = useFormState(applyForProject, {
    errors: {},
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h3 className="text-xl font-semibold">
        {!hasApplied
          ? "Join this project to start contributing"
          : "The project's owner has received your request"}
      </h3>

      <form action={action}>
        <CustomLabel htmlFor="apply"></CustomLabel>
        <input type="hidden" name="apply" value={project._id.toString()} />
        <ApplyProjectButton hasApplied={hasApplied} />
      </form>
      {formState.errors?.apply && (
        <ErrorMessage>{formState.errors?.apply.join(", ")}</ErrorMessage>
      )}
    </div>
  );
}

export default ApplyProject;
