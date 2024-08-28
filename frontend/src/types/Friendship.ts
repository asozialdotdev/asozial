import { Types } from "mongoose";

type FriendshipId = Types.ObjectId | string;

type SenderId = {
  info: {
    image: string;
    username: string;
    _id: Types.ObjectId;
  };
};
type ReceiverId = {
  info: {
    image: string;
    username: string;
    _id: Types.ObjectId;
  };
};

type Friendship = {
  _id: FriendshipId;
  senderId?: SenderId;
  receiverId?: ReceiverId;
  friends?: Types.ObjectId[];
  messages?: Types.ObjectId[];
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
};

export type { Friendship, FriendshipId, SenderId, ReceiverId };
