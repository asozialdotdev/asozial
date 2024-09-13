import { Request, Response, NextFunction } from "express";
import UserPost from "../../models/UserPost.models";

export const deleteUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  try {
    const userPost = await UserPost.findById(req.params.userPostId);
    if (!userPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userPost.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await UserPost.findByIdAndDelete(req.params.userPostId);
    res.status(204);
  } catch (error) {
    next(error);
  }
};
