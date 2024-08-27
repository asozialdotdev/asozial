"use client";
import { useState } from "react";
import CustomSwitch from "../common/ui/CustomSwitch";
import { Project } from "@/types/Project";
import EditProjectForm from "./EditProjectForm";
import SyncedProject from "./SyncedProject";

function EditProject({ project }: { project: Project }) {
  const [synced, setSynced] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Do you want to sync your project with your Github repo?
        </h2>

        <CustomSwitch
          id="existing-user"
          checked={synced}
          onCheckedChange={setSynced}
        />
      </div>

      {synced ? (
        <SyncedProject project={project} />
      ) : (
        <EditProjectForm project={project} />
      )}
    </>
  );
}

export default EditProject;
