import { GoCommentDiscussion } from "react-icons/go";

function ReplyCount({ replies }: { replies?: number }) {
  return (
    <div className="mb-4 ml-14 flex items-center gap-4">
      <div className="flex items-center gap-1">
        <GoCommentDiscussion size={22} />
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          {replies}
        </p>
      </div>
    </div>
  );
}

export default ReplyCount;
