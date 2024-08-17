import { Types } from "mongoose";

type ProjectPostId = Types.ObjectId | string;
type ReplyId = Types.ObjectId | string | null | undefined;

type User = {
  _id: Types.ObjectId;
  avatarUrl: string;
  name: string;
};

type ProjectPost = {
  _id: ProjectPostId;
  title: string;
  content: string;
  userId: User;
  projectId: Types.ObjectId;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
};

type Reply = {
  _id: ReplyId;
  content: string;
  userId: User;
  projectPostId: ProjectPostId;
  parentId?: Types.ObjectId;
  children: Reply[];
  createdAt: Date;
  updatedAt: Date;
};

export type { ProjectPost, ProjectPostId, Reply, ReplyId, User };
