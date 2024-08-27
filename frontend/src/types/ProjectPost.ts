import { Types } from "mongoose";
import { UserId } from "./User";

type ProjectPostId = Types.ObjectId | string;
type ReplyId = Types.ObjectId | string | null | undefined;

type User = {
  info: {
    image: string;
    name: string;
    username: string;
  };
  _id: UserId;
};

type ProjectInPost = {
  _id: Types.ObjectId;
  slug: string;
};

type ProjectPost = {
  _id: ProjectPostId;
  title: string;
  content: string;
  userId: User;
  projectId: ProjectInPost;
  replies: Reply[];
  likes: UserId[];
  dislikes: UserId[];
  image?: string;
  placeholder?: string;
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
  deleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type { ProjectPost, ProjectPostId, Reply, ReplyId, User };
