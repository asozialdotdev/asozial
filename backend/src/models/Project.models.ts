import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    pitch: { type: String },
    githubRepo: { type: String },
    techStack: [{ type: String, default: [] }],
    mainLanguage: { type: String },
    image: { type: String },
    placeholder: { type: String },
    slug: { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    membersJoined: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    membersApplied: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    membersInvited: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
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
projectSchema.index({ owner: 1, title: 1 }, { unique: true });

export default model("Project", projectSchema);
