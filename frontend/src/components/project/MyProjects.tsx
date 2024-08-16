"use client";
// React
import { useState } from "react";
//Hooks
import useSearchForMyProjects from "@/hooks/projects/useSearchForMyProjects";

//Components
import ProjectCard from "./ProjectCard";

//UI
import { Input } from "../ui/input";

//Types
import type { Project } from "@/types/Project";

function MyProjects({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { projectsState, isLoading, error } = useSearchForMyProjects(
    searchTerm,
    projects,
  );

  return (
    <>
      <section className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-3xl">My Projects</h2>
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[25rem]"
        />
      </section>
      <article className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        <ProjectCard
          projects={projectsState}
          isLoading={isLoading}
          error={error}
        />
      </article>
    </>
  );
}

export default MyProjects;
