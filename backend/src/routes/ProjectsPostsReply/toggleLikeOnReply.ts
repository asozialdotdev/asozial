import { Request, Response, NextFunction } from "express";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const toggleLikeOnReply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    const hasLiked = reply.likes.includes(userId);

    if (hasLiked) {
      await reply.updateOne({ $pull: { likes: userId } });
    } else {
      await reply.updateOne({
        $push: { likes: userId },
        $pull: { dislikes: userId },
      });
    }

    const updatedReply = await ProjectPostReply.findById(req.params.replyId);

    res.json({
      likes: updatedReply?.likes.length,
      dislikes: updatedReply?.dislikes.length,
    });
  } catch (error) {
    console.error("Error liking reply:", error);
    next(error);
  }
};
