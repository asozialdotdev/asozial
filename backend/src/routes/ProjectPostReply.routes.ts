import express, { Request, Response, NextFunction } from "express";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";

const projectPostReplyRouter = express.Router();

// POST Toggle Like a project post reply
projectPostReplyRouter.post("/:replyId/like", async (req, res, next) => {
  const { userId } = req.body;

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
});

// POST Toggle Dislike a project post reply
projectPostReplyRouter.post("/:replyId/dislike", async (req, res, next) => {
  const { userId } = req.body;

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
});

// PUT Edit a reply
projectPostReplyRouter.put("/:replyId", async (req, res, next) => {
  const { content, edited, userId } = req.body;

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if (reply.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updateReply = await ProjectPostReply.findByIdAndUpdate(
      req.params.replyId,
      { content, edited },
      { new: true, runValidators: true }
    );

    res.json(updateReply);
  } catch (error) {
    console.error("Error editing reply:", error);
    next(error);
  }
});

//PATCH mark reply as deleted

projectPostReplyRouter.patch("/:replyId", async (req, res, next) => {
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

    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Reply marked as deleted"
    );

    res.json({ message: "Reply marked as deleted", reply });
  } catch (error) {
    console.error("Error deleting reply:", error);
    next(error);
  }
});

export default projectPostReplyRouter;
