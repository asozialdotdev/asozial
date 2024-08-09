"use client";
import React, { useEffect, useState } from "react";

function ProjectContainer() {
  const [input, setInput] = useState("");

  const getProject = async (repoUrl) => {
    const response = await fetch(
      `http://localhost:5005/projects/new/?repoUrl=${repoUrl}`,
    );
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getProject(input);
    console.log(input);
  };

  return (
    <section className="flex flex-col border-2 p-4 hover:grow lg:order-last lg:min-w-[400px] xl:order-last xl:min-w-[400px]">
      <h1 className="py-6 text-xl">Projects</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type your project"
          className="border-2 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </section>
  );
}

export default ProjectContainer;
