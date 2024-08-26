import { Schema, model } from "mongoose";

const UserMatchSchema = new Schema({
  userOne: { type: Schema.Types.ObjectId, ref: "User", default: [] },
  userTwo: { type: Schema.Types.ObjectId, ref: "User", default: [] },
  status: { type: String, enum: ["pending", "accepted", "declined"] },
});

export default model("UserMatch", UserMatchSchema);
