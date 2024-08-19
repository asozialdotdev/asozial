import { Schema, model } from "mongoose";

const projectPostReplySchema = new Schema(
  {
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projectPostId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectPost",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectPostReply",
      default: null,
    },
    children: [{ type: Schema.Types.ObjectId, ref: "ProjectPostReply" }], // References to nested replies
  },
  {
    collection: "ProjectPostReply",
    timestamps: true,
  }
);

projectPostReplySchema.index({ likes: 1 });
projectPostReplySchema.index({ dislikes: 1 });

export default model("ProjectPostReply", projectPostReplySchema);
