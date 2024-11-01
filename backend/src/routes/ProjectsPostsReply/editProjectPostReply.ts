import { Request, Response, NextFunction } from "express";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const editProjectPostReply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, edited, userId } = req.body;

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if (reply.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedReply = await ProjectPostReply.findByIdAndUpdate(
      req.params.replyId,
      { content, edited },
      { new: true, runValidators: true }
    );

    res.json(updatedReply);
  } catch (error) {
    console.error("Error editing reply:", error);
    next(error);
  }
};
