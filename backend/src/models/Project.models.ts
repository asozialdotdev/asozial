import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    pitch: { type: String },
    githubRepo: { type: String },
    techStack: [{ type: String }],
    mainLanguage: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    membersJoined: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersApplied: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersInvited: [{ type: Schema.Types.ObjectId, ref: "User" }],
    socials: {
      slack: { type: String },
      discord: { type: String },
      notion: { type: String },
      gitlab: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    collection: "Project",
    timestamps: true,
  }
);

export default model("Project", projectSchema);
