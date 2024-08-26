import { Types } from "mongoose";
import { ProjectId } from "./Project";
import { ProjectPostId } from "./ProjectPost";
import Friendship from "./Friendship";

// next-auth.d.ts

type UserId = Types.ObjectId | string;

type TechStackEntry = {
  lines: number;
  projects: number;
  textColor: string;
  bgColor: string;
  Icon: React.ComponentType<{ className: string }>;
};

type CodingLanguage = {
  language: string;
  lines: number;
  projects: number;
  bgColor: string;
  textColor: string;
  Icon: React.ComponentType<{ className: string }>;
};

type User = {
  _id: UserId;
  username: string;
  info: {
    bio: string;
    username: string;
    name: string;
    email: string;
    image: string;
    company: string;
    website: string;
    location: string;
    hireable: boolean;
  };
  skills: {
    languagesSpoken: string[];
    codingLanguages: CodingLanguage[];
    codingLibraries: CodingLanguage[];
  };
  projects: {
    projectsJoined: ProjectId[];
    projectsSuggested: ProjectId[];
    projectsApplied: ProjectId[];
    dashboardPosts: ProjectPostId[];
  };
  socials: {
    platform: string;
    url: string;
  };
  friends: {
    accepted: Friendship[];
    incomingPending: Friendship[];
    incomingDeclined: Friendship[];
    outgoingPending: Friendship[];
    outgoingDeclined: Friendship[];
  };
  matches: {
    users: {
      suggested: UserId[];
      pending: UserId[];
      accepted: UserId[];
      declined: UserId[];
    };
    projects: {
      suggested: ProjectId[];
      pending: ProjectId[];
      accepted: ProjectId[];
      declined: ProjectId[];
    };
  };
  github: {
    id: number;
    nodeId: string;
    accessToken: string;
    username: string;
    notificationEmail: string;
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
};

export type { User, UserId, CodingLanguage, TechStackEntry };
