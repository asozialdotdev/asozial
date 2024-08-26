import { Schema, model } from "mongoose";

const socialSchema = new Schema({
  platform: { type: String },
  url: { type: String },
});

const codingLanguageSchema = new Schema({
  language: { type: String },
  lines: { type: Number },
  projects: { type: Number },
  bgColor: { type: String },
  textColor: { type: String },
  Icon: { type: Schema.Types.Mixed }, // Assuming Icon is a React component
});

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    info: {
      bio: { type: String },
      username: { type: String },
      name: { type: String },
      email: { type: String },
      image: { type: String },
      company: { type: String },
      website: { type: String },
      location: { type: String },
      hireable: { type: Boolean },
    },
    skills: {
      languagesSpoken: [{ type: String }],
      codingLanguages: [{ type: [String, codingLanguageSchema] }],
      codingLibraries: [{ type: [String, codingLanguageSchema] }],
    },
    projects: {
      projectsJoined: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      projectsSuggested: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      projectsApplied: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      projectsAvoided: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      dashboardPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    },
    socials: [socialSchema],
    friends: {
      accepted: [{ type: Schema.Types.ObjectId, ref: "Friendship" }],
      incomingPending: [{ type: Schema.Types.ObjectId, ref: "Friendship" }],
      incomingDeclined: [{ type: Schema.Types.ObjectId, ref: "Friendship" }],
      outgoingPending: [{ type: Schema.Types.ObjectId, ref: "Friendship" }],
      outgoingDeclined: [{ type: Schema.Types.ObjectId, ref: "Friendship" }],
    },
    matches: {
      users: {
        suggested: [{ type: Schema.Types.ObjectId, ref: "User" }],
        pending: [{ type: Schema.Types.ObjectId, ref: "User" }],
        accepted: [{ type: Schema.Types.ObjectId, ref: "User" }],
        declined: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      projects: {
        suggested: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        pending: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        accepted: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        declined: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      },
    },
    github: {
      id: { type: Number },
      username: { type: String },
      notificationEmail: { type: String },
      bio: { type: String },
      apiUrl: { type: String },
      url: { type: String },
      eventsUrl: { type: String },
      followersUrl: { type: String },
      followers: [{ type: Object }],
      followerNumber: { type: Number },
      followingUrl: { type: String },
      following: [{ type: Object }],
      followingNumber: { type: Number },
      publicGistsUrl: { type: String },
      publicGists: [{ type: Object }],
      publicGistsNumber: { type: Number },
      privateGistsNumber: { type: String },
      starredUrl: { type: String },
      subscriptionsUrl: { type: String },
      subscriptions: [{ type: Object }],
      subscriptionsNumber: { type: Number },
      organizationsUrl: { type: String },
      organizations: [{ type: Object }],
      organizationsNumber: { type: Number },
      publicReposUrl: { type: String },
      publicRepos: [{ type: Object }],
      publicReposNumber: { type: Number },
      createdAt: { type: String },
      updatedAt: { type: String },
      collaboratorsNumber: { type: Number },
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export default model("User", userSchema);
