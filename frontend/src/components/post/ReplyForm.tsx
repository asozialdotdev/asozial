//Actions
import { createReply } from "@/actions";

//Hooks
import { useFormState } from "react-dom";

//Components
import ButtonReplyForm from "./ButtonReplyForm";

//Ui
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";

//Types
import type { Post } from "@/types/Post";

type ReplyFormProps = {
  isReplying: boolean;
  handleReply: () => void;
  post: Post;
};

function ReplyForm({ isReplying, handleReply, post }: ReplyFormProps) {
  const projectId = post.projectId;
  const parentId = post._id;
  const [formState, action] = useFormState(
    createReply.bind(null, { projectId, parentId }),
    {
      errors: {},
    },
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section className="w-full py-4">
      {!isReplying ? (
        <Button className="text-base font-semibold" onClick={handleReply}>
          Reply
        </Button>
      ) : (
        <form
          ref={formRef}
          action={async (formData) => {
            formRef.current?.reset();
            action(formData);
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <label htmlFor="content"></label>
          <Textarea
            name="content"
            className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
            placeholder="Reply to this post..."
          />
          {formState.errors?.content && (
            <span className="text-sm font-light text-red-500">
              {formState.errors?.content.join(", ")}
            </span>
          )}

          <ButtonReplyForm handleReply={handleReply} />
        </form>
      )}
    </section>
  );
}

export default ReplyForm;
