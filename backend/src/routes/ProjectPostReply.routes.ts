import express, { Request, Response, NextFunction } from "express";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";

const projectPostReplyRouter = express.Router();

// POST Like a reply
projectPostReplyRouter.post("/:replyId/like", async (req, res, next) => {
  const { userId } = req.body;

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    // no null values in the arrays
    reply.likes = reply.likes.filter((id) => id && id.toString() !== null);
    reply.dislikes = reply.dislikes.filter(
      (id) => id && id.toString() !== null
    );

    // If user already liked the post, remove the like
    if (reply.likes.includes(userId)) {
      reply.likes = reply.likes.filter((id) => id.toString() !== userId);
    } else {
      // Otherwise, add the like
      reply.likes.push(userId);

      // If the user had disliked the post, remove the dislike
      reply.dislikes = reply.dislikes.filter((id) => id.toString() !== userId);
    }

    await reply.save();
    res.json({ likes: reply.likes.length, dislikes: reply.dislikes.length });
  } catch (error) {
    console.error("Error liking reply:", error);
    next(error);
  }
});

// POST Dislike a reply
projectPostReplyRouter.post("/:replyId/dislike", async (req, res, next) => {
  const { userId } = req.body;

  try {
    const reply = await ProjectPostReply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    // no null values in the arrays
    reply.likes = reply.likes.filter((id) => id && id.toString() !== null);
    reply.dislikes = reply.dislikes.filter(
      (id) => id && id.toString() !== null
    );

    // If user already disliked the post, remove the dislike (toggle off)
    if (reply.dislikes.includes(userId)) {
      reply.dislikes = reply.dislikes.filter((id) => id.toString() !== userId);
    } else {
      // Otherwise, add the dislike
      reply.dislikes.push(userId);

      // If the user had liked the post, remove the like
      reply.likes = reply.likes.filter((id) => id.toString() !== userId);
    }

    await reply.save();
    res.json({ likes: reply.likes.length, dislikes: reply.dislikes.length });
  } catch (error) {
    console.error("Error disliking reply:", error);
    next(error);
  }
});

// PUT Edit a reply
projectPostReplyRouter.put("/:replyId", async (req, res, next) => {
  const { content, userId } = req.body;

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
      { content },
      { new: true, runValidators: true }
    );

    res.json(updateReply);
  } catch (error) {
    console.error("Error editing reply:", error);
    next(error);
  }
});

export default projectPostReplyRouter;