import { fetchProjectById, handleJoinProject } from "@/actions";
import PageContainer from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { languagesWithColors } from "@/constants";
import { ProjectId } from "@/types/Project";
import clsx from "clsx";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import github from "/public/github.png";
import anonymous from "/public/anonymous-user.png";
import { useState } from "react";
import ProjectThread from "@/components/project/ProjectThread";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];

const languagesTest = [
  "TypeScript",
  "JavaScript",
  "CSS",
  "Rust",
  "HTML",
  "Java",
];

const userIdTest = "1234";

async function Page({ params }: { params: { projectId: ProjectId } }) {
  const project = await fetchProjectById(params.projectId);

  const isMember = membersJoined.includes("Jos"); // hardcoded
  // const isMember = membersJoined.includes(user._id); // dynamic

  const techStackClass = (language: string) => {
    const stackColor = languagesWithColors.find(
      (lang) => lang.language === language,
    );
    return clsx(
      "rounded-full px-2 py-1 text-sm text-light ",
      stackColor ? stackColor.color : "bg-gray-300",
    );
  };
  return (
    <PageContainer className="max-w-screen-md gap-4">
      <section className="flex flex-col gap-4 border-b border-b-neutral-300 dark:border-b-neutral-600">
        {/* Title and description */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-semibold capitalize tracking-wide">
            {project.title}
          </h2>
          <h3 className="text-xl first-letter:capitalize">
            {project.description}
          </h3>
        </div>

        {/* Pitch*/}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Pitch</h4>
          <p className="text-base">{project.pitch}</p>
        </div>

        {/* Tech stack */}
        <div className="flex gap-4">
          {project.techStack.map((tech: string) => (
            <span key={tech} className={techStackClass(tech)}>
              {tech}
            </span>
          ))}
        </div>

        {/* Members */}

        <div className="mt-2 flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Members</h4>
          <div className="flex gap-4">
            {membersJoined.map((member: string) => (
              <TooltipProvider key={member}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link title={member} href={`/users/${userIdTest}`}>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{member}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{member}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
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
        </div>
      </section>

      {!isMember ? (
        <ProjectThread project={project} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h3 className="text-xl font-semibold">
            Join this project to see the threads
          </h3>
          <form action={handleJoinProject}>
            <input type="hidden" name="projectId" value={project._id} />
            <Button type="submit">Join this project</Button>
          </form>
        </div>
      )}
    </PageContainer>
  );
}

export default Page;
