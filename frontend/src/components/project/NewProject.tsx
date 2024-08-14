"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import ExistingProjectForm from "./ExistingProjectForm";
import NewProjectForm from "./NewProjectForm";
import PageTitle from "../common/PageTitle";

function NewProject() {
  const [isExistingProject, setIsExistingProject] = useState(false);
  const [isNewProjectForm, setIsNewProjectForm] = useState(false);

  console.log(isNewProjectForm, isExistingProject);

  const handleExistingProject = () => {
    setIsExistingProject(true);
    setIsNewProjectForm(false);
  };

  const handleNewProjectForm = () => {
    setIsExistingProject(false);
    setIsNewProjectForm(true);
  };
  return (
    <div className='flex flex-col gap-4'>
    <PageTitle className='text-center'>
      Start a new project
    </PageTitle>

    <div>
      <h2 className='text-xl'>
        Does your project already have an Github repository?
      </h2>
    </div>
      <div className="flex max-w-screen-md flex-col items-center gap-12 lg:grid lg:grid-cols-2">
        <Button onClick={handleExistingProject} size="lg">
          Existing project
        </Button>
        <Button onClick={handleNewProjectForm} size="lg">
          New project form
        </Button>
      </div>

      {isExistingProject && <ExistingProjectForm />}
      {isNewProjectForm && <NewProjectForm />}
    </div>
  );
}

export default NewProject;
