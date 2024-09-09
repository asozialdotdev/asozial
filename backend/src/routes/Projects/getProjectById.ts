import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("members.membersJoined", "info.name info.username info.image")
      .populate("owner", "info.name info.username info.image")
      .exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};
