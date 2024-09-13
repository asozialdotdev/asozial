import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";

export const toggleDislikeOnProjectPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  try {
    const post = await ProjectPost.findById(req.params.projectPostId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasDisliked = post.dislikes.includes(userId);

    if (hasDisliked) {
      await post.updateOne({ $pull: { dislikes: userId } });
    } else {
      await post.updateOne({
        $push: { dislikes: userId },
        $pull: { likes: userId },
      });
    }

    const updatedPost = await ProjectPost.findById(req.params.projectPostId);

    res.status(200).json({
      likes: updatedPost?.likes.length,
      dislikes: updatedPost?.dislikes.length,
    });
  } catch (error) {
    console.error("Error disliking post:", error);
    next(error);
  }
};
