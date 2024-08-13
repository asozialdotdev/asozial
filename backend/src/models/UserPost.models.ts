import { Schema, model } from "mongoose";

const projectPostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String },
  },
  {
    collection: "ProjectPost",
    timestamps: true,
  }
);

export default model("ProjectPost", projectPostSchema);
