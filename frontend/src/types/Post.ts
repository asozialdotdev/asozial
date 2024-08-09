import { Types } from "mongoose";

type Post = {
  userId: Types.ObjectId;
  title?: string;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export default Post;
