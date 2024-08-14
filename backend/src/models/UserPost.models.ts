import { Schema, model } from "mongoose";

const userPostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    reactions: [
      {
        type: String,
        enum: ["like", "love", "happy", "sad", "watching", "hands"],
        default: null,
      },
    ],
  },
  {
    collection: "ProjectPost",
    timestamps: true,
  }
);

export default model("UserPost", userPostSchema);

// like --> thumbs up
// love --> heart
// sad --> sad face
// happy --> smile
// watching --> eyes
// hands --> raising hands
