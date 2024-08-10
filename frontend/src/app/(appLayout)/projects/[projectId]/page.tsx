import { Button } from "@/components/ui/button";
import { useState } from "react";
const membersJoined = ["Benjamin", "Mirko", "John", "Jane"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];
import { handleJoinProject } from "@/app/actions/projects.server";

async function Page({ params }: { params: { projectId: string } }) {
  const data = await fetch(
    `http://localhost:5005/projects/${params.projectId}`,
  );
  const project = await data.json();
  console.log("project: ", project);

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>{project.techStack}</p>
      <h2>Members</h2>
      {membersJoined.map((member: any) => (
        <ul key={member}>
          <li>{member}</li>
        </ul>
      ))}
      <form action={handleJoinProject}>
        <input type="hidden" name="projectId" value={project._id} />
        <Button type="submit">Join this project</Button>
      </form>{" "}
    </div>
  );
}

export default Page;
