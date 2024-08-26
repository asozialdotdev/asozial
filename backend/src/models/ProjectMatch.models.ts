import { Schema, model } from "mongoose";

const ProjectMatchSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", default: [] },
  project: { type: Schema.Types.ObjectId, ref: "Project", default: [] },
  status: { type: String, enum: ["pending", "accepted", "declined"] },
});

export default model("ProjectMatch", ProjectMatchSchema);
