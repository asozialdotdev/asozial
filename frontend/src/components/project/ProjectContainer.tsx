import Link from "next/link";
import React, { useEffect, useState } from "react";

function ProjectContainer() {
  const getProject = async (repoUrl: string) => {
    const response = await fetch(
      `http://localhost:5005/projects/new/?repoUrl=${repoUrl}`,
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="hidden w-1/4 flex-col bg-light p-4 text-dark dark:bg-dark dark:text-light lg:flex">
      <h1 className="py-6 text-xl">Projects</h1>
      <p className="text-lg">Projects request or any other stuff</p>
    </section>
  );
}

export default ProjectContainer;
