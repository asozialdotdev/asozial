import { Types } from "mongoose";

type Message = {
  id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
  isRead?: boolean;
};

export default Message;
