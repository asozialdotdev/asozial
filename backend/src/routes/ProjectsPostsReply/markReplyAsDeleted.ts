import { Request, Response, NextFunction } from "express";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const markReplyAsDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId)
      .populate("projectPostId", "projectId slug")
      .exec();

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if (reply.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await ProjectPostReply.updateOne(
      { _id: req.params.replyId },
      { $set: { deleted: true, deletedAt: new Date() } }
    );

    res.json({ message: "Reply marked as deleted", reply });
  } catch (error) {
    console.error("Error deleting reply:", error);
    next(error);
  }
};
