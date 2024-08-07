import { Schema, model } from "mongoose";

const friendshipSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      required: true,
    },
  },
  {
    collection: "Friendship",
    timestamps: true,
  }
);

export default model("Friendship", friendshipSchema);
