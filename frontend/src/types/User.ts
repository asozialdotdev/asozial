import { Types } from "mongoose";

type User = {
  githubID: string;
  email: string;
  password: string;
  username: string;
  name?: string;
  avatarUrl?: string;
  githubUrl?: string;
  website?: string;
  city?: string;
  country?: string;
  languagesSpoken?: string[];
  techStack?: string[];
  projectsJoined?: Types.ObjectId[];
  projectsSuggested?: Types.ObjectId[];
  projectsApplied?: Types.ObjectId[];
  dashboardPosts?: Types.ObjectId[];
  avoidedUsers?: Types.ObjectId[];
  avoidedProjects?: Types.ObjectId[];
};

export default User;
