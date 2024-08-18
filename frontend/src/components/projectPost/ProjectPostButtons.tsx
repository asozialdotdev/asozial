import { ProjectPost } from "@/types/ProjectPost";
import { GoCommentDiscussion, GoThumbsdown, GoThumbsup } from "react-icons/go";

function ProjectPostButtons({
  projectPost = undefined,
}: {
  projectPost?: ProjectPost;
}) {
  return (
    <>
      <div className="ml-14 flex items-center gap-4 mb-4">
        {projectPost && (
          <div className="flex items-center gap-1">
            <GoCommentDiscussion size={22} />
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              {projectPost.replyCount}
            </p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <GoThumbsup size={20} />
          <p className="text-lg text-neutral-500 dark:text-neutral-400">10</p>
        </div>
        <div className="flex items-center gap-1">
          <GoThumbsdown size={20} />
          <p className="text-lg text-neutral-500 dark:text-neutral-400">10</p>
        </div>
      </div>
    </>
  );
}

export default ProjectPostButtons;
