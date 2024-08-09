import { Types } from "mongoose";

type Project = {
  title: string;
  description: string;
  githubRepo: string;
  techStack: string[];
  owner: Types.ObjectId;
  membersJoined: Types.ObjectId[];
  membersApplied: Types.ObjectId[];
  membersInvited: Types.ObjectId[];
  status: "active" | "inactive" | "completed";
  posts: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

type ProjectSidebarContextTypes = {
  isProjectSidebarOpen: boolean;
  toggleProjectSidebar: () => void;
  projectSidebarRef: React.MutableRefObject<HTMLDivElement | null>;
  projectHeaderRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type { Project, ProjectSidebarContextTypes };
