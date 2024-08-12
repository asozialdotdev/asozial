"use client";
import { Project } from "@/types/Project";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { baseUrl } from "@/constants";
import Link from "next/link";

function MyProjects({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsState, setProjectsState] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `${baseUrl}/projects/search?query=${searchTerm}`,
      );
      const data = await response.json();
      setProjectsState(data);
    };

    fetchProjects();
  }, [searchTerm]);

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-3xl">My Projects</h2>
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[25rem]"
        />
      </section>
      <article className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        Project cards should be displayed here
        <ProjectCard projects={projectsState} />
      </article>
    </>
  );
}

export default MyProjects;
