import { Types } from "mongoose";

type Message = {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  title?: string;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
  isRead?: boolean;
};

export default Message;
