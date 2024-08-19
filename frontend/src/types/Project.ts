import { Types } from "mongoose";

type ProjectId = Types.ObjectId | string;
type Member = {
  _id: Types.ObjectId;
  image: string;
  name: string;
};

type Project = {
  _id: ProjectId;
  title: string;
  description: string;
  githubRepo: string;
  techStack: string[];
  owner: Member;
  pitch: string;
  membersJoined: Member[];
  membersApplied: Member[];
  membersInvited: Member[];
  status: "active" | "inactive" | "completed";
  socials: string[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Project, ProjectId };
