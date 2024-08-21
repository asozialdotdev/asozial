import { Types } from "mongoose";

type UserId = Types.ObjectId | string;

type User = {
  _id: UserId;
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
  githubFollowers: {
    githubId: string;
    githubUsername: string;
  };
  githubFollowingUrl?: string;
  githubFollowing: {
    githubId: string;
    githubUsername: string;
  };
  githubPublicGistsUrl?: string;
  githubPublicGists: {
    name: string;
    description: string;
    url: string;
  };
  githubPrivateGistsNumber?: string;
  githubStarredUrl?: string;
  githubStarred: {
    name: string;
    description: string;
    url: string;
  };
  githubSubscriptionsUrl?: string;
  githubSubscriptions: {
    name: string;
    description: string;
    url: string;
  };
  githubOrganizationsUrl?: string;
  githubOrganizations: {
    name: string;
    description: string;
    url: string;
  };
  githubReposUrl?: string;
  githubRepos: {
    name: string;
    description: string;
    url: string;
  };
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
