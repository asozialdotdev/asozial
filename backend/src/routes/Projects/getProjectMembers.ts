import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const getProjectMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("members.membersJoined", "info.name info.username info.image")
      .populate("members.membersApplied", "info.name info.username info.image")
      .populate("members.membersInvited", "info.name info.username info.image")
      .populate("members.membersAvoided", "info.name info.username info.image")
      .populate("owner", "info.name info.username info.image")
      .exec();

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const result = {
      membersJoined: project.members?.membersJoined,
      membersApplied: project.members?.membersApplied,
      membersInvited: project.members?.membersInvited,
      membersAvoided: project.members?.membersAvoided,
      owner: project.owner,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};
