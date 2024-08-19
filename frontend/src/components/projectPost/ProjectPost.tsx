//Types
import type { ProjectPost } from "@/types/ProjectPost";
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import ProjectPostContainer from "./ProjectPostContainer";

function ProjectPost({ projectPost }: { projectPost: ProjectPost }) {
  const post = projectPost;

  return (
    <ProjectPostContainer>
      <div className="flex items-start gap-4">
        {/* Avatar  */}
        <div className="flex flex-col gap-3 pl-2 lg:contents">
          <UserAvatar
            src={post.userId.avatarUrl}
            name={post.userId.name}
            userId={post.userId._id}
          />

          <ProjectPostContent
            name={post.userId.name}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
          />
        </div>
      </div>
      <div>
        <div className="flex items-start gap-4">
          <ReplyCount replies={post.replyCount} />
          <ProjectPostButtons projectPost={post} />
          <Link
            className="ml-4 font-semibold"
            key={post._id.toString()}
            href={`/projects/${post.projectId}/posts/${post._id}`}
          >
            <span>
              <FaRegArrowAltCircleRight size={30} />
            </span>
          </Link>
        </div>
      </div>
    </ProjectPostContainer>
  );
}

export default ProjectPost;
