import { Types } from "mongoose";
import { ProjectId } from "./Project";
import { ProjectPostId } from "./ProjectPost";

// next-auth.d.ts
import NextAuth from "next-auth";

type UserId = Types.ObjectId | string;

type TechStackEntry = {
  lines: number;
  projects: number;
  textColor: string;
  bgColor: string;
  Icon: React.ComponentType<{ className: string }>;
};

type Social = {
  platform: string;
  url: string;
};

type CodingLanguage = {
  language: string;
  lines: number;
  projects: number;
  bgColor: string;
  textColor: string;
  Icon: React.ComponentType<{ className: string }>;
};

type Github = {
  id: number;
  username: string;
  bio: string;
  apiUrl: string;
  url: string;
  eventsUrl: string;
  followersUrl: string;
  followers: object[];
  followerNumber: number;
  followingUrl: string;
  following: object[];
  followingNumber: number;
  publicGistsUrl: string;
  publicGists: object[];
  publicGistsNumber: number;
  privateGistsNumber: string;
  starredUrl: string;
  subscriptionsUrl: string;
  subscriptions: object[];
  subscriptionsNumber: number;
  organizationsUrl: string;
  organizations: object[];
  organizationsNumber: number;
  publicReposUrl: string;
  publicRepos: object[];
  publicReposNumber: number;
  createdAt: string;
  updatedAt: string;
  collaboratorsNumber: number;
};

type User = {
  _id: UserId;
  bio: string;
  username: string;
  name: string;
  email: string;
  notificationEmail: string;
  image: string;
  company: string;
  website: string;
  location: string;
  hireable: boolean;
  socials: Social[];
  languagesSpoken: string[];
  codingLanguages: [string, CodingLanguage][];
  codingLibraries: [string, CodingLanguage][];
  projectsJoined: ProjectId[];
  projectsSuggested: ProjectId[];
  projectsApplied: ProjectId[];
  projectsAvoided: ProjectId[];
  dashboardPosts: ProjectPostId[];
  usersMatched: UserId[];
  usersAvoided: UserId[];
  friendsPending: UserId[];
  friendsAccepted: UserId[];
  friendsRejected: UserId[];
  friendsRejectedBy: UserId[];
  github: Github;
};

export type { User, UserId, TechStackEntry };
