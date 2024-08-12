import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function ProjectPostForm() {
  return (
    <div className="flex">
      <h2 className="text-xl font-semibold">Create a new post</h2>
      <form className="mt-2">
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

        <Button className="my-2 bg-dark dark:bg-light">Post</Button>
      </form>
    </div>
  );
}

export default ProjectPostForm;
