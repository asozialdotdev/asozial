import { Types } from "mongoose";

type ProjectId = Types.ObjectId;

type Project = {
  _id: ProjectId;
  title: string;
  description: string;
  githubRepo: string;
  techStack: string[];
  owner: Types.ObjectId;
  pitch: string;
  membersJoined: Types.ObjectId[];
  membersApplied: Types.ObjectId[];
  membersInvited: Types.ObjectId[];
  status: "active" | "inactive" | "completed";
  posts: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Project, ProjectId };
