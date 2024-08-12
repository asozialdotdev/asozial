"use client";
import { useState } from "react";
import { Button } from "../ui/button";

function NewProject() {
  const [isExistingProject, setIsExistingProject] = useState(false);
  const [isNewProjectForm, setIsNewProjectForm] = useState(false);

  const handleExistingProject = () => {
    setIsExistingProject(true);
    setIsNewProjectForm(false);
  };

  const handleNewProjectForm = () => {
    setIsExistingProject(false);
    setIsNewProjectForm(true);
  };
  return (
    <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-2">

      <Button onClick={handleExistingProject} size="lg">existing projects</Button>
      <Button onClick={handleNewProjectForm} size="lg">new project form</Button>
      {isExistingProject && <h1>Existing Projects</h1>}
      {isNewProjectForm && <h1>New Project Form</h1>}

    </div>
  );
}

export default NewProject;
