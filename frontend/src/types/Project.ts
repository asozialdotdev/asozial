import { Types } from "mongoose";

type ProjectId = Types.ObjectId | string;
type Members = {
  _id: Types.ObjectId;
  avatarUrl: string;
  name: string;
};

type Project = {
  _id: ProjectId;
  title: string;
  description: string;
  githubRepo: string;
  techStack: string[];
  owner: Types.ObjectId;
  pitch: string;
  membersJoined: Members[];
  membersApplied: Members[];
  membersInvited: Members[];
  status: "active" | "inactive" | "completed";
  socials: string[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Project, ProjectId };
