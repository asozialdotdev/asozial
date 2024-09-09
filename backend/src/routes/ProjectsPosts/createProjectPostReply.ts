import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const createProjectPostReply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectPostId, userId, content, parentId } = req.body;

    if (!projectPostId || !userId || !content) {
      return res
        .status(400)
        .json({ message: "projectPostId, userId and content are required" });
    }

    const projectPost = await ProjectPost.findById(projectPostId);
    if (!projectPost) {
      return res.status(404).json({ message: "Project post not found" });
    }

    // Create the new reply
    const newReply = await ProjectPostReply.create({
      content,
      projectPostId,
      userId,
      parentId: parentId || null,
    });

    // If it's a nested reply parentId !== null, add it to the parent's children array
    if (parentId) {
      await ProjectPostReply.findByIdAndUpdate(parentId, {
        $push: { children: newReply._id },
      });
    }

    res.status(201).json(newReply);
  } catch (error) {
    next(error);
  }
};
