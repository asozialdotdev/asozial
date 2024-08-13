import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true }, // Reference to the Project
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Post", default: null }, // Reference to the parent post (null if it's not a reply)
    replies: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Array of references to other Posts (replies)
  },
  {
    collection: "Post",
    timestamps: true,
  }
);
// Virtual to get a boolean if the post is a reply or not
postSchema.virtual("isReply").get(function () {
  return this.parentId !== null;
});

export default model("Post", postSchema);
