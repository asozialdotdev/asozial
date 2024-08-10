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

async function Page() {
  const data = await fetch("http://localhost:5005/projects/search");
  const projects = await data.json();
  console.log(projects[0]._id);
  return (
    <>
      <div className="flex h-fit min-w-[100rem] max-w-[100rem] gap-4">
        {projects.map((project: Project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
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

        {projects.map((project: Project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
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

        {projects.map((project: Project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
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

        {projects.map((project: Project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
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
      </div>
    </>
  );
}

export default Page;
