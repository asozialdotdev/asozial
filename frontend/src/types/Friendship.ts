import { Types } from "mongoose";

type Friendship = {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  messages?: Types.ObjectId[];
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
};

export default Friendship;
