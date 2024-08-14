//Next
import Link from "next/link";

//Components
import ProjectPostForm from "./ProjectPostForm";
import PageTitle from "../common/PageTitle";
import ProjectPost from "./ProjectPost";

//Types
import type { Post } from "@/types/Post";
import type { ProjectId } from "@/types/Project";

type ProjectPostsListProps = {
  posts: Post[];
  projectId: ProjectId;
};

function ProjectPostsList({ posts, projectId }: ProjectPostsListProps) {
  return (
    <>
      <section className="mt-4 flex flex-col gap-4 pb-6 w-full">
        <PageTitle>Threads</PageTitle>

        <ProjectPostForm projectId={projectId} />

        {posts.map((post) => (
          <Link
            key={post._id.toString()}
            href={`/projects/${projectId}/${post._id}`}
          >
            <ProjectPost post={post} />
          </Link>
        ))}
      </section>
    </>
  );
}

export default ProjectPostsList;
