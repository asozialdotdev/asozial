import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProjectId } from "@/types/Project";
import { createPost } from "@/actions";
import { fetchPosts } from "@/actions";
import Link from "next/link";

async function ProjectPostForm({
  params,
}: {
  params: { projectId: ProjectId };
}) {
  const { projectId, postId } = params;
  console.log("Params in post form", params);
  const posts = await fetchPosts(projectId);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold">Create a new post</h2>
      <form className="mt-2" action={createPost}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full"
        />

        <Textarea
          name="content"
          placeholder="Content"
          className="mt-2 w-full"
        />

        <input type="hidden" name="projectId" value={projectId.toString()} />

        <Button className="my-2 bg-dark dark:bg-light">Post</Button>
      </form>

      {posts.map((post) => (
        <Link key={post.title} href={`${projectId}/${post._id}`}>
          <div className="flex flex-col" key={post._id}>
            <h3 className="text-xl">Title: {post.title}</h3>
            <p className="mb-2">content:{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectPostForm;
