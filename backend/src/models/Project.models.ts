import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    pitch: { type: String },
    githubRepo: { type: String },
    techStack: [{ type: String }],
    mainLanguage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    membersJoined: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersApplied: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersInvited: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: [{ type: String, enum: ["active", "inactive", "completed"] }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    collection: "Project",
    timestamps: true,
  }
);

export default model("Project", projectSchema);
