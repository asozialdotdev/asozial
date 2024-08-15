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

const membersJoined = ["Benjamin", "Mirko", "John", "Jane"];
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
            {membersJoined.map((member) => (
              <ul key={member}>
                <li>{member}</li>
              </ul>
            ))}
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
