"use client";
import { useState } from "react";
import ExistingProjectForm from "./ExistingProjectForm";
import NewProjectForm from "./NewProjectForm";
import PageTitle from "../common/ui/PageTitle";
import { Switch } from "../ui/switch";
import CustomSwitch from "../common/ui/CustomSwitch";

function NewProject() {
  const [isExistingProject, setIsExistingProject] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageTitle className="text-center">Start a new project</PageTitle>

      <div className="flex items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Does your project already have an Github repository?
        </h2>

        <CustomSwitch
          id="existing-user"
          checked={isExistingProject}
          onCheckedChange={setIsExistingProject}
        />
      </div>

      {isExistingProject ? <ExistingProjectForm /> : <NewProjectForm />}
    </div>
  );
}

export default NewProject;
