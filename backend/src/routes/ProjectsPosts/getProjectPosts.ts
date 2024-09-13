import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";

export const getProjectPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const projectPosts = await ProjectPost.find({ projectId })
      .populate({
        path: "userId",
        select: "info.username info.name info.image",
      })
      .populate({
        path: "projectId",
        select: "slug",
      })
      .populate("replyCount");
    res.status(200).json(projectPosts);
  } catch (error) {
    next(error);
  }
};
