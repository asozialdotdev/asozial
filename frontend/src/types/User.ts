import { Types } from "mongoose";

type UserId = Types.ObjectId | string;

type User = {
  githubID: string;
  email?: string;
  username?: string;
  name?: string;
  company?: string;
  blog?: string;
  twitterUsername?: string;
  bio?: string;
  location?: string;
  hireable?: boolean;
  image?: string;
  githubApiUrl?: string;
  githubUrl?: string;
  githubFollowersUrl?: string;
  githubFollowingUrl?: string;
  githubPublicGistsUrl?: string;
  githubPrivateGistsNumber?: string;
  githubStarredUrl?: string;
  githubSubscriptionsUrl?: string;
  githubOrganizationsUrl?: string;
  githubReposUrl?: string;
  githubPublicReposNumber?: number;
  githubPublicGistsNumber?: number;
  githubCreatedAt?: string;
  githubUpdatedAt?: string;
  githubCollaboratorsNumber?: number;
  website?: string;
  socials?: string[];
  languagesSpoken?: string[];
  techStack?: string[];
  projectsJoined?: Types.ObjectId[];
  projectsSuggested?: Types.ObjectId[];
  projectsApplied?: Types.ObjectId[];
  dashboardPosts?: Types.ObjectId[];
  avoidedUsers?: Types.ObjectId[];
  avoidedProjects?: Types.ObjectId[];
  matchedUsers?: Types.ObjectId[];
};

export type { User, UserId };
