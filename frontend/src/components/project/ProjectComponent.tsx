//Next
import Image from "next/image";

//Components
import PageTitle from "../common/PageTitle";
import UserAvatar from "../common/UserAvatar";

//UI
import github from "/public/socials/github.png";

//Utils
import { techStackClass } from "@/utils";

//Types
import type { Project } from "@/types/Project";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "../ui/button";

const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];

const userIdTest = "1234567890";

async function ProjectComponent({ project }: { project: Project }) {
  const session = await auth();
  const isOwner = project.owner._id === session?.user?.id;
  console.log("IS OWNER", isOwner);

  return (
    <section className="flex w-full flex-col gap-4 border-b border-b-neutral-300 px-4 dark:border-b-neutral-600">
      {/* Title and description */}
      <div className="flex flex-col items-center gap-2">
        <PageTitle className="capitalize">{project.title}</PageTitle>
        <h3 className="text-xl first-letter:capitalize">
          {project.description}
        </h3>
      </div>

      {/* Pitch*/}
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold">Pitch</h4>
        <p className="text-justify text-base font-light">{project.pitch}</p>
      </div>

      {/* Tech stack */}
      <div className="flex gap-4 px-4 py-2">
        {project.techStack.map((tech: string) => (
          <span key={tech} className={techStackClass(tech)}>
            {tech}
          </span>
        ))}
      </div>

      {/* Members */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold">Members</h4>
        <div className="flex gap-4">
          {project.membersJoined.length !== 0 ? (
            project.membersJoined.map((member) => (
              <UserAvatar
                key={member.name}
                src={member.avatarUrl}
                name={member.name}
                userId={userIdTest}
              />
            ))
          ) : (
            <p>No members joined yet</p>
          )}
        </div>
      </div>

      <div className="mb-8 mt-4 flex items-center gap-2">
        <a href={project.githubRepo} target="_blank">
          <Image
            src={github}
            alt="github logo"
            width={30}
            height={30}
            className="dark:invert dark:filter"
          />
        </a>
        {isOwner && (
          <Link href={`/projects/${project._id}/edit`}>
            <Button>Edit project</Button>
          </Link>
        )}
      </div>
    </section>
  );
}

export default ProjectComponent;
