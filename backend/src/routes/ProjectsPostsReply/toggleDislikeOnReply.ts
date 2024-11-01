import { Request, Response, NextFunction } from "express";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const toggleDislikeOnReply = async (
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

    const hasDisliked = reply.dislikes.includes(userId);

    if (hasDisliked) {
      await reply.updateOne({ $pull: { dislikes: userId } });
    } else {
      await reply.updateOne({
        $push: { dislikes: userId },
        $pull: { likes: userId },
      });
    }

    const updatedReply = await ProjectPostReply.findById(req.params.replyId);

    res.json({
      likes: updatedReply?.likes.length,
      dislikes: updatedReply?.dislikes.length,
    });
  } catch (error) {
    console.error("Error disliking reply:", error);
    next(error);
  }
};
