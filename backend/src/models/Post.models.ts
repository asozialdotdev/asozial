import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true }, // Reference to the Project
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String },
    replies: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Array of references to other Posts (replies)
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  {
    collection: "Post",
    timestamps: true,
  }
);

export default model("Post", postSchema);
