"use client";
import { Project } from "@/types/Project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// const membersJoined = ["Benjamin", "Mirko", "John", "Jane"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];

type ProjectCardProps = {
  projects: Project[];
  isLoading: boolean;
  error: string;
};

function ProjectCard({ projects, isLoading, error }: ProjectCardProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (projects.length === 0 || !projects) {
    return <p>No projects found</p>;
  }
  console.log("Projects:", projects);
  return (
    <>
      {projects.map((project: Project, i) => (
        <Card className="min-w-[20rem] max-w-[20rem]" key={i}>
          <CardHeader>
            <CardTitle className="capitalize">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {project.techStack.map((tech) => (
              <p key={tech}>{tech}</p>
            ))}
          </CardContent>
          <CardContent>
            {project.membersJoined.map((member) => {
              console.log("Member:", member);
              return (
                <ul key={member.name}>
                  <Avatar className="flex-shrink-0">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ul>
              );
            })}
          </CardContent>

          <CardContent></CardContent>
          <CardFooter>
            <Link href={`/projects/${project._id}`}>Project Details</Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default ProjectCard;
