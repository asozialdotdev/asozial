import { Types } from "mongoose";

type FriendshipId = Types.ObjectId | string;

type Friendship = {
  _id: FriendshipId;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
  friends?: Types.ObjectId[];
  messages?: Types.ObjectId[];
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Friendship, FriendshipId };
