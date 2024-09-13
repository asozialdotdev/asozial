import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";

export const updateProjectPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, image, placeholder, edited, userId } = req.body;

    const post = await ProjectPost.findById(req.params.projectPostId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedPost = await ProjectPost.findByIdAndUpdate(
      req.params.projectPostId,
      { title, content, image, placeholder, edited },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
