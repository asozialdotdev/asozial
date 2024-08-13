import { Types } from "mongoose";

type PostId = Types.ObjectId | string;

type Post = {
  postId: PostId;
  userId: Types.ObjectId;
  title?: string;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export type { Post, PostId };
