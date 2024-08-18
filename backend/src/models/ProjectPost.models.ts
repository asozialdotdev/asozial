import { Schema, model } from "mongoose";

const projectPostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true }, // Assuming there's a Topic model
  },
  {
    collection: "ProjectPost",
    timestamps: true,
  }
);

projectPostSchema.virtual("replyCount", {
  ref: "ProjectPostReply", // The model to use
  localField: "_id", // Find replies where `localField`
  foreignField: "projectPostId", // is equal to `foreignField`
  count: true, // Only get the number of replies
});

projectPostSchema.set("toJSON", { virtuals: true });
projectPostSchema.set("toObject", { virtuals: true });

export default model("ProjectPost", projectPostSchema);
