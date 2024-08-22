//Next
import Image from "next/image";

//Components
import PageTitle from "../common/ui/PageTitle";
import UserAvatar from "../common/ui/UserAvatar";

//UI
import github from "/public/socials/github.png";

//Utils
import { techStackClass, setStatusIcon } from "@/utils";

//Types
import type { Project } from "@/types/Project";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import { socialsData } from "@/constants";
import { checkIsMember } from "@/actions";
import ProjectPitch from "./ProjectPitch";
import ProjectMainLanguage from "./ProjectMainLanguage";

const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];

const userIdTest = "1234567890";

async function ProjectComponent({ project }: { project: Project }) {
  const session = await auth();
  const isMember = await checkIsMember(project._id);
  const isOwner = project.owner._id === session?.user?.id;
  console.log("PROJECT.MEMBERSJOINED", project.membersJoined);

  return (
    <section className="flex w-full flex-col gap-4 border-b border-b-neutral-300 px-4 dark:border-b-neutral-600">
      {/* Title and description */}
      <div className="flex flex-col items-center gap-2">
        <PageTitle className="capitalize">{project.title}</PageTitle>
        <h3 className="text-xl text-zinc-500 first-letter:capitalize dark:text-zinc-400">
          {project.description}
        </h3>
      </div>

      {/* Pitch*/}

      <ProjectPitch project={project} />

      {/* Tech stack */}
      <div className="flex gap-4 px-4 py-2">
        {project.techStack.map((tech: string) => (
          <span key={tech} className={techStackClass(tech)}>
            {tech}
          </span>
        ))}
      </div>

      {/* Status */}
      <div>
        <h4 className="text-lg font-semibold">Status</h4>
        <p className="capitalize">
          <span>
            {setStatusIcon(project.status)} {project.status}
          </span>
        </p>
      </div>

      {/* Language */}
      <ProjectMainLanguage project={project} />

      {/* Members */}
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold">Members</h4>
        <div className="flex gap-4">
          {project.membersJoined.length > 0 ? (
            project.membersJoined.map((member) => (
              <UserAvatar
                key={member.name}
                src={member.image}
                username={member.username}
                userId={userIdTest}
              />
            ))
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400">
              No members joined yet
            </p>
          )}
        </div>
      </div>

      {/* Socials */}
      <div className="mb-8 mt-4 flex items-center gap-5">
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank">
            <Image
              src={github}
              alt="github logo"
              width={40}
              height={40}
              className="inline dark:invert dark:filter"
            />
          </a>
        )}
        {(isMember || isOwner) &&
          project.socials &&
          socialsData.map((socialData) => {
            const socialUrl =
              project.socials && project?.socials[socialData.key];

            return (
              socialUrl && (
                <a href={socialUrl} target="_blank" key={socialData.key}>
                  <Image
                    src={socialData.imageSrc}
                    alt={socialData.alt}
                    width={socialData.key === "notion" ? 40 : 40}
                    height={socialData.key === "notion" ? 40 : 40}
                    className="inline rounded-md"
                  />
                </a>
              )
            );
          })}
      </div>
      <div className="mb-6">
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
