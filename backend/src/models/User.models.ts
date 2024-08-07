import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
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
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export default model("User", userSchema);
