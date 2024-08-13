import { createPost } from "@/actions/projects/createPost.server";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProjectId } from "@/types/Project";
import { fetchPosts } from "@/actions";

async function ProjectPostForm({
  params,
}: {
  params: { projectId: ProjectId };
}) {
  const { projectId } = params;
  const posts = await fetchPosts(projectId);

  return (
    <div className="flex">
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

      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPostForm;
