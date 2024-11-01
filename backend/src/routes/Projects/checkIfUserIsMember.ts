import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const checkIfUserIsMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      isMember: project.members?.membersJoined.includes(user?._id!),
    });
  } catch (error) {
    next(error);
  }
};
