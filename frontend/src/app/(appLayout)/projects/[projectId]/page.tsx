import { fetchProjectById, handleJoinProject } from "@/actions";
import PageContainer from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { languagesWithColors } from "@/constants";
import { ProjectId } from "@/types/Project";
import clsx from "clsx";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import github from "/public/github.png";
import { useState } from "react";
import ProjectThread from "@/components/project/ProjectThread";
import Image from "next/image";
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
    <PageContainer className="max-w-screen-md gap-10">
      <section className="flex flex-col gap-4 border-b border-b-neutral-300 dark:border-b-neutral-600 lg:border-none">
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
          <p className="text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex gap-4">
          {languagesTest.map((tech: string) => (
            <span key={tech} className={techStackClass(tech)}>
              {tech}
            </span>
          ))}
        </div>

        {/* Members */}
        {/* <div className="flex flex-col">
          <h4 className="text-lg font-semibold">Members</h4>
          <div className="flex gap-4">
            {membersJoined.map((member: string) => (
              <Link href={`/users/${userIdTest}`}>
                <span key={member}>{member}</span>
              </Link>
            ))}
          </div>
        </div> */}
        <div className="mt-2 flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Members</h4>
          <div className="flex gap-4">
            {membersJoined.map((member: string) => (
              <Link title={member} href={`/users/${userIdTest}`}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{`Add a fallback image`}</AvatarFallback>
                </Avatar>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-4 flex items-center gap-2">
          <a href={project.githubRepo} target="_blank">
            <Image
              src={github}
              alt="github logo"
              width={30}
              height={30}
              className="dark:invert dark:filter"
            />
          </a>
          <p></p>
        </div>
      </section>

      {!isMember ? (
        <ProjectThread project={project} />
      ) : (
        <div className="my-4 flex w-[45rem] flex-col items-center justify-center gap-4">
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
