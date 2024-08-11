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

function ProjectCard({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((project: Project) => (
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>{project.title}</CardTitle>
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
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>{project.title}</CardTitle>
            <CardDescription>Recipe-App</CardDescription>
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
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>Todo-App</CardTitle>
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
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>My-Super-App</CardTitle>
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
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>We-do</CardTitle>
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
        <Card className="min-w-[20rem] max-w-[20rem]" key={Number(project._id)}>
          <CardHeader>
            <CardTitle className='capitalize'>Weather-AI</CardTitle>
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
