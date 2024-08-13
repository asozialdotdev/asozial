import { Types } from "mongoose";

type PostId = Types.ObjectId | string;

type Post = {
  _id: PostId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  title?: string;
  content: string;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
};

type Reply = {
  _id: PostId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Post, PostId, Reply };
