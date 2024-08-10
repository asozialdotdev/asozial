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
    <section className="flex grow flex-col border-2 bg-light p-4 text-dark dark:bg-dark dark:text-light">
      <h1 className="py-6 text-xl">Projects</h1>
    </section>
  );
}

export default ProjectContainer;
