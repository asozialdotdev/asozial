import { Request, Response, NextFunction } from "express";
import UserPost from "../../models/UserPost.models";

export const createUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newPost = await UserPost.create({
      userId: userId,
      title,
      content,
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
