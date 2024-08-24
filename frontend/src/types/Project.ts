import { createProjectSchema } from "@/lib/schema";
import { Types } from "mongoose";
import { StaticImageData } from "next/image";
import { z } from "zod";

type SocialPlatforms = "slack" | "discord" | "notion" | "gitlab";

type SocialsData = {
  key: SocialPlatforms;
  placeholder: string;
  imageSrc: StaticImageData;
  alt: string;
};

type ProjectId = Types.ObjectId | string;
type Member = {
  _id: Types.ObjectId | string;
  avatarUrl: string;
  image: string;
  name: string;
  username: string;
};

type Socials = {
  slack?: string;
  discord?: string;
  notion?: string;
  gitlab?: string;
};

type Project = {
  _id: ProjectId;
  title: string;
  description: string;
  githubRepo: string;
  techStack: string[];
  owner: Member;
  pitch: string;
  image?: string;
  placeholder?: string;
  slug: string;
  mainLanguage: string;
  membersJoined: Member[];
  membersApplied: Member[];
  membersInvited: Member[];
  status: "active" | "inactive" | "completed";
  socials?: Socials;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateUpdateProject = {
  title: string;
  description: string;
  pitch: string;
  techStack: string[];
  mainLanguage: string;
  githubRepo?: string;
  image?: string;
  placeholder?: string;
  socials?: {
    slack?: string;
    discord?: string;
    notion?: string;
    gitlab?: string;
  };
};
type Inputs = z.infer<typeof createProjectSchema>;

export type {
  Project,
  ProjectId,
  Member,
  CreateUpdateProject,
  SocialsData,
  Socials,
  Inputs,
};
