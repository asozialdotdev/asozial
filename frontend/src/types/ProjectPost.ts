import { Types } from "mongoose";
import { UserId } from "./User";

type ProjectPostId = Types.ObjectId | string;
type ReplyId = Types.ObjectId | string | null | undefined;

type User = {
  _id: Types.ObjectId;
  image: string;
  name: string;
  username: string;
};

type ProjectPost = {
  _id: ProjectPostId;
  title: string;
  content: string;
  userId: User;
  projectId: Types.ObjectId;
  replies: Reply[];
  likes: UserId[];
  dislikes: UserId[];
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
  replyCount: number;
};

type Reply = {
  _id: ReplyId;
  content: string;
  userId: User;
  projectPostId: ProjectPostId;
  parentId?: Types.ObjectId;
  children: Reply[];
  likes: UserId[];
  dislikes: UserId[];
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { ProjectPost, ProjectPostId, Reply, ReplyId, User };
