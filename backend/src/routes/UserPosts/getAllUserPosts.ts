import { Request, Response, NextFunction } from "express";
import UserPost from "../../models/UserPost.models";

export const getAllUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await UserPost.find().populate("userId");
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
