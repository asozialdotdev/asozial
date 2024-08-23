//Next
import { notFound } from "next/navigation";

//Components
import ProjectPostForm from "./ProjectPostForm";
import PageTitle from "../common/ui/PageTitle";
import ProjectPost from "./ProjectPost";

//Types
import type { ProjectPost as TProjectPost } from "@/types/ProjectPost";
import type { ProjectId } from "@/types/Project";

type ProjectPostsListProps = {
  projectPosts: TProjectPost[];
  projectId: ProjectId;
};

function ProjectPostsList({ projectPosts, projectId }: ProjectPostsListProps) {
  const posts = projectPosts;

  if (!posts) {
    notFound();
  }

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <section className="mt-4 flex w-full flex-col gap-4 pb-6">
        {/* Post Form */}
        <ProjectPostForm projectId={projectId} />

        <PageTitle>
          <span>{posts.length}</span>{" "}
          {posts.length > 1 ? "Threads" : "Thread"}
        </PageTitle>
        {posts.length === 0 && (
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No threads yet. Be the first to start one!
          </p>
        )}
        {/* Posts */}
        {sortedPosts.map((post) => (
          <ProjectPost key={post._id.toString()} projectPost={post} />
        ))}
      </section>
    </>
  );
}

export default ProjectPostsList;
