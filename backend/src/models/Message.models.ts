import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    friendshipId: {
      type: Schema.Types.ObjectId,
      ref: "Friendship",
      required: true,
    },
    content: { type: String },
    isRead: { type: Boolean, default: false },
  },
  {
    collection: "Message",
    timestamps: true,
  }
);

export default model("Message", messageSchema);
