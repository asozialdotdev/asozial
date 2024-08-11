import { baseUrl } from "@/constants";
import { Project } from "@/types/Project";
import Link from "next/link";
import React, { useEffect, useState } from "react";

async function ProjectContainer() {
  const data = await fetch(`${baseUrl}/projects/search`);
  const projects = await data.json();

  

  return (
    <div className="hidden w-1/4 flex-col bg-light p-4 text-dark dark:bg-dark dark:text-light lg:flex">
      <h2 className="py-6 text-xl">Projects</h2>



      <section className="flex flex-col gap-4">
        {projects.map((project: Project) => (
          <>
            <div key={Number(project._id)}>
              <Link href={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
            </div>
            <div key={Number(project._id)}>
              <Link href={`/projects/${project._id}`}>
                <h3>Recipe-App</h3>
              </Link>
            </div>
            <div key={Number(project._id)}>
              <Link href={`/projects/${project._id}`}>
                <h3>Todo App</h3>
              </Link>
            </div>
          </>
        ))}
      </section>
    </div>
  );
}

export default ProjectContainer;
