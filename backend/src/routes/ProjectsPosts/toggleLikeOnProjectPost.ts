import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";

export const toggleLikeOnProjectPost = async (
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

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      await post.updateOne({ $pull: { likes: userId } });
    } else {
      await post.updateOne({
        $push: { likes: userId },
        $pull: { dislikes: userId },
      });
    }

    const updatedPost = await ProjectPost.findById(req.params.projectPostId);

    res.status(200).json({
      likes: updatedPost?.likes.length,
      dislikes: updatedPost?.dislikes.length,
    });
  } catch (error) {
    console.error("Error toggling like on post:", error);
    next(error);
  }
};
