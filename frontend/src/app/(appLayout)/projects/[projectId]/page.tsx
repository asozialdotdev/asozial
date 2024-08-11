import { handleJoinProject } from "@/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];
const membersApplied = ["Alice", "Bob", "Charlie"];
const membersInvited = ["David", "Eve", "Frank"];

async function Page({ params }: { params: { projectId: string } }) {
  const data = await fetch(
    `http://localhost:5005/projects/${params.projectId}`,
  );
  const project = await data.json();

  const isMember = membersJoined.includes("José"); // hardcoded
  // const isMember = membersJoined.includes(user._id); // dynamic

  return (
    <div className="flex flex-col gap-10">
      <section className="border-b-2 px-6 py-3 max-w-screen-md">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold capitalize tracking-wide">
            {project.title}
          </h2>
          <h3 className="text-xl first-letter:capitalize">
            {project.description}
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <p>{project.techStack}</p>
        <h2>Members</h2>
        {membersJoined.map((member: any) => (
          <ul key={member}>
            <li>{member}</li>
          </ul>
        ))}
        {isMember && <p>You are already a member of this project</p>}
        <form action={handleJoinProject}>
          <input type="hidden" name="projectId" value={project._id} />
          <Button type="submit">Join this project</Button>
        </form>
      </section>

      <section>Thread</section>
    </div>
  );
}

export default Page;
