import { Post } from "@/types/Post";
import { Button } from "../ui/button";
import { createReply } from "@/actions";
import { Textarea } from "../ui/textarea";

type ReplyFormProps = {
  isReplying: boolean;
  handleReply: () => void;
  post: Post;
};

function ReplyForm({ isReplying, handleReply, post }: ReplyFormProps) {
  return (
    <section className="w-full py-4">
      {!isReplying ? (
        <Button className="text-base font-semibold" onClick={handleReply}>
          Reply
        </Button>
      ) : (
        <form action={createReply} className="mt-4 flex flex-col gap-4">
          <Textarea
            name="content"
            className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
            placeholder="Reply to this post..."
          />
          <input
            type="hidden"
            name="projectId"
            value={post.projectId.toString()}
          />
          <input type="hidden" name="parentId" value={post._id.toString()} />

          <div className="flex items-center gap-4">
            <Button type="submit" className="">
              Comment
            </Button>
            <Button type="button" variant="outline" onClick={handleReply}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
