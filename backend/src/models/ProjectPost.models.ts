import { Schema, model } from "mongoose";

const projectPostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String },
    content: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  {
    collection: "ProjectPost",
    timestamps: true,
  }
);

export default model("ProjectPost", projectPostSchema);
