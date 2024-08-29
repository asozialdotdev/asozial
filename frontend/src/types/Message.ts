import { Types } from "mongoose";

type Message = {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isRead?: boolean;
};

export default Message;
