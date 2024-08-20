//Types
import type { ProjectPost } from "@/types/ProjectPost";
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import ProjectPostContainer from "./ProjectPostContainer";
import ParentProjectPostContent from "./ParentProjectPostContent";

function ProjectPost({ projectPost }: { projectPost: ProjectPost }) {
  const post = projectPost;

  return (
    <ProjectPostContainer>
      <ParentProjectPostContent post={post} isProjectPage />
    </ProjectPostContainer>
  );
}

export default ProjectPost;
