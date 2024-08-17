import { Schema, model } from "mongoose";

const projectPostReplySchema = new Schema(
  {
    content: { type: String, required: true },
    projectPostId: { type: Schema.Types.ObjectId, ref: "ProjectPost", required: true }, // Reference to the post being replied to
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "ProjectPostReply", default: null }, // Reference to another reply if this is a nested reply
    children: [{ type: Schema.Types.ObjectId, ref: "ProjectPostReply" }], // References to nested replies
  },
  {
    collection: "ProjectPostReply",
    timestamps: true,
  }
);

export default model("ProjectPostReply", projectPostReplySchema);
