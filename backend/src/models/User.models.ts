import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    githubID: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String },
    avatarUrl: { type: String },
    githubUrl: { type: String },
    website: { type: String },
    city: { type: String },
    country: { type: String },
    languagesSpoken: [{ type: String }],
    techStack: [{ type: String }],
    projectsJoined: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsSuggested: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    projectsApplied: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    dashboardPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    avoidedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avoidedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export default model("User", userSchema);
