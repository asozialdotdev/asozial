//Next
import Link from "next/link";

//Components
import ProjectPostForm from "./ProjectPostForm";
import PageTitle from "../common/PageTitle";
import ProjectPost from "./ProjectPost";

//Types
import type { ProjectPost as TProjectPost } from "@/types/Post";
import type { ProjectId } from "@/types/Project";

type ProjectPostsListProps = {
  projectPosts: TProjectPost[];
  projectId: ProjectId;
};

function ProjectPostsList({ projectPosts, projectId }: ProjectPostsListProps) {
  const posts = projectPosts;
  return (
    <>
      <section className="mt-4 flex w-full flex-col gap-4 pb-6">
        <ProjectPostForm projectId={projectId} />

        <PageTitle>Threads</PageTitle>
        {posts.length === 0 && (
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No threads yet. Be the first to start one!
          </p>
        )}
        {posts.map((post) => (
          <Link
            key={post._id.toString()}
            href={`/projects/${projectId}/posts/${post._id}`}
          >
            <ProjectPost projectPost={post} />
          </Link>
        ))}
      </section>
    </>
  );
}

export default ProjectPostsList;
