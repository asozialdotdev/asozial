import { Types } from "mongoose";

type ProjectPost = {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  title?: string;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export type { ProjectPost };
