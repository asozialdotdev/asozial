import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const createProjectPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, image, placeholder, projectId, userId } = req.body;

    if (!title || !content || !projectId || !userId) {
      return res.status(400).json({
        message: "title, content, projectId and userId are required",
      });
    }

    // Ensure the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create the new post
    const newPost = await ProjectPost.create({
      title,
      content,
      image,
      placeholder,
      userId,
      projectId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { dashboardPosts: newPost._id },
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
