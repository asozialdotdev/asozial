import { Schema, model } from "mongoose";

const projectPostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    image: { type: String },
    placeholder: { type: String },
    edited: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  {
    collection: "ProjectPost",
    timestamps: true,
  }
);

projectPostSchema.virtual("replyCount", {
  ref: "ProjectPostReply",
  localField: "_id", // Find replies where `localField`
  foreignField: "projectPostId", // is equal to `foreignField`
  count: true, // get the number of replies
  match: { deleted: { $ne: true } }, // only count replies that are not deleted
});

projectPostSchema.index({ likes: 1 });
projectPostSchema.index({ dislikes: 1 });

projectPostSchema.set("toJSON", { virtuals: true });
projectPostSchema.set("toObject", { virtuals: true });

export default model("ProjectPost", projectPostSchema);
