import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    githubRepo: { type: String },
    techStack: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // githubOwner: { type: String },
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
