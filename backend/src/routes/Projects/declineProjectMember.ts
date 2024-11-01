import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const declineProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { memberId, userId } = req.body;
    const project = await Project.findById(projectId)
      .populate("owner", "info.username")
      .exec();

    console.log("project found in decline", project);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.owner._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to decline this user" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $pull: { "members.membersApplied": memberId },
        $push: { "members.membersAvoided": memberId },
      }
    );

    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.updateOne(
      { _id: memberId },
      {
        $pull: { "projects.projectsApplied": project._id },
        $push: { "projects.projectsDeclined": project._id },
      }
    );

    res.json({ project, member });
  } catch (error) {
    next(error);
  }
};
