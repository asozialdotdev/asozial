import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  {
    collection: "Post",
    timestamps: true,
  }
);

export default model("Post", postSchema);
