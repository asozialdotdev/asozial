//Next
import Link from "next/link";
import Image from "next/image";

//Components
import PageTitle from "../common/PageTitle";

//UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import github from "/public/github.png";

//Utils
import { languagesWithColors } from "@/constants";
import clsx from "clsx";

//Types
import type { Project } from "@/types/Project";

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

const userIdTest = "1234567890";

function ProjectComponent({ project }: { project: Project }) {
  const techStackClass = (language: string) => {
    const stackColor = languagesWithColors.find(
      (lang) => lang.language === language,
    );
    return clsx(
      "rounded-full px-2 py-1 text-sm text-light ",
      stackColor ? stackColor.color : "bg-gray-300",
    );
  };

  console.log("project:", project);
  return (
    <section className="flex flex-col gap-4 border-b border-b-neutral-300 px-4 dark:border-b-neutral-600">
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
  );
}

export default ProjectComponent;
