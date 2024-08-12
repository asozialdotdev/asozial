import { Project } from "@/types/Project";
import { Input } from "../ui/input";

const projectsPostsTest = [
  {
    id: 1,
    title: "My First Project",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "José",
  },
  {
    id: 2,
    title: "Anyone has a project idea?",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "Benjamin",
  },
  {
    id: 3,
    title: "What do you think about my project?",
    content: "I want to share my project with you guys and get some feedback.",
    user: "Mirko",
  },
  {
    id: 4,
    title: "My First Project",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "José",
  },
  {
    id: 5,
    title: "Anyone has a project idea?",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "Benjamin",
  },
  {
    id: 6,
    title: "What do you think about my project?",
    content: "I want to share my project with you guys and get some feedback.",
    user: "Mirko",
  },
  {
    id: 7,
    title: "My First Project",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "José",
  },
  {
    id: 8,
    title: "Anyone has a project idea?",
    content:
      "I want to share my experience with you guys about my project idea and get some feedback.",
    user: "Benjamin",
  },
  {
    id: 9,
    title: "What do you think about my project?",
    content: "I want to share my project with you guys and get some feedback.",
    user: "Mirko",
  },
];

function ProjectThread({ project }: { project: Project }) {
  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold capitalize tracking-wide">
          Threads
        </h2>

        {projectsPostsTest.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-[1px] border-b border-b-neutral-300 dark:border-b-neutral-600"
          >
            <p className="text-xs">{post.user}</p>
            <h3 className="text-base tracking-wide">{post.title}</h3>
            <p className="mb-4 text-sm">{post.content}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default ProjectThread;
