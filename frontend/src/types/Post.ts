import { Types } from "mongoose";

type PostId = Types.ObjectId | string;

type Member = {
  _id: Types.ObjectId;
  avatarUrl: string;
  name: string;
};

type Post = {
  _id: PostId;
  userId: Member;
  projectId: Types.ObjectId;
  parentId?: Types.ObjectId;
  title: string;
  content: string;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
};

type Reply = {
  _id: PostId;
  userId: Member
  projectId: Types.ObjectId;
  parentId: Types.ObjectId;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Post, PostId, Reply };
