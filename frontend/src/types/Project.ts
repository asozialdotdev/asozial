import { Types } from "mongoose";

type ProjectId = Types.ObjectId | string;
type Member = {
  _id: Types.ObjectId | string;
  avatarUrl: string;
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
  mainLanguage: string;
  membersJoined: Member[];
  membersApplied: Member[];
  membersInvited: Member[];
  status: "active" | "inactive" | "completed";
  socials: string[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateUpdateProject = {
  title: string;
  description: string;
  pitch: string;
  mainLanguage: string;
  githubRepo?: string;
  techStack: string[];
  socials?: string[];
};

export type { Project, ProjectId, Member, CreateUpdateProject };
