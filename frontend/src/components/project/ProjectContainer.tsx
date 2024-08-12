import { baseUrl } from "@/constants";
import { Project } from "@/types/Project";
import Link from "next/link";

async function ProjectContainer() {
  const data = await fetch(`${baseUrl}/projects`);
  const projects = await data.json();
  return (
    <div className="hidden w-1/4 flex-col bg-light p-4 text-dark dark:bg-dark dark:text-light lg:flex">
      <Link href="/projects">
        <h2 className="py-6 text-xl">Projects</h2>
      </Link>
      <section className="flex flex-col gap-4">
        {projects.map((project: Project) => (
          <>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>{project.title}</h3>
            </Link>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>Tinder-Like-App</h3>
            </Link>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>Todo App</h3>
            </Link>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>My-Super-App</h3>
            </Link>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>We-do</h3>
            </Link>
            <Link key={Number(project._id)} href={`/projects/${project._id}`}>
              <h3>Weather-AI</h3>
            </Link>
          </>
        ))}
      </section>
    </div>
  );
}

export default ProjectContainer;
