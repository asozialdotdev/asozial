import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    githubId: { type: Number },
    email: { type: String },
    username: { type: String },
    name: { type: String },
    company: { type: String },
    blog: { type: String },
    twitterUsername: { type: String },
    bio: { type: String },
    location: { type: String },
    hireable: { type: Boolean },
    image: { type: String },
    githubApiUrl: { type: String },
    githubUrl: { type: String },
    githubFollowersUrl: { type: String },
    githubFollowingUrl: { type: String },
    githubPublicGistsUrl: { type: String },
    githubPrivateGistsNumber: { type: String },
    githubStarredUrl: { type: String },
    githubSubscriptionsUrl: { type: String },
    githubOrganizationsUrl: { type: String },
    githubReposUrl: { type: String },
    githubPublicReposNumber: { type: Number },
    githubPublicGistsNumber: { type: Number },
    githubCreatedAt: { type: String },
    githubUpdatedAt: { type: String },
    githubCollaboratorsNumber: { type: Number },
    website: { type: String },
    socials: [{ type: String }],
    languagesSpoken: [{ type: String }],
    techStack: [{ type: String }],
    projectsJoined: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsSuggested: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsApplied: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    dashboardPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    avoidedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avoidedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    matchedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export default model("User", userSchema);
