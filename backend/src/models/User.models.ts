import { Schema, model } from "mongoose";

const socialSchema = new Schema({
  platform: { type: String },
  url: { type: String },
});

const userSchema = new Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String },
    notificationEmail: { type: String },
    image: { type: String },
    company: { type: String },
    website: { type: String },
    location: { type: String },
    hireable: { type: Boolean },
    socials: [socialSchema],
    languagesSpoken: [{ type: String }],
    codingLanguages: [{ type: Object }],
    codingLibraries: [{ type: Object }],
    projectsJoined: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsSuggested: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsApplied: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsAvoided: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    dashboardPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    usersMatched: [{ type: Schema.Types.ObjectId, ref: "User" }],
    usersAvoided: [{ type: Schema.Types.ObjectId, ref: "User" }],
    github: {
      id: { type: Number },
      username: { type: String },
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
