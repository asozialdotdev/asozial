import { createPost } from "@/actions";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ProjectId } from "@/types/Project";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PostForm({ projectId }: { projectId: ProjectId }) {
  return (
    <form className="mt-2" action={createPost}>
      <div className="mt-6 flex flex-col gap-2">
        <label className="text-sm font-extralight" htmlFor="title"></label>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="text"
                name="title"
                placeholder="An awesome title to start a discussion"
                className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
              />
            </TooltipTrigger>
            <TooltipContent align="start">Title</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-10 flex flex-col">
        <label className="text-sm font-extralight" htmlFor="content"></label>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <Textarea
                name="content"
                placeholder="What's on your mind?"
                className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
              />
            </TooltipTrigger>
            <TooltipContent align="start">Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <input type="hidden" name="projectId" value={projectId.toString()} />

      <Button className="my-6 bg-dark px-8 text-lg dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300">
        Post
      </Button>
    </form>
  );
}

export default PostForm;
