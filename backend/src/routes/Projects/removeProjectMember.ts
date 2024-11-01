import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const removeProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { userId, memberId } = req.body;
    const project = await Project.findById(projectId)
      .populate("owner", "info.username")
      .exec();
    console.log("memberId", memberId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (!project.members?.membersJoined.includes(memberId)) {
      return res
        .status(401)
        .json({ error: "User is not a member of this project" });
    }

    if (project.owner._id.toString() !== userId) {
      return res
        .status(402)
        .json({ error: "You are not authorized to remove this user" });
    }

    const member = await User.findById(memberId);

    if (!member) {
      return res.status(403).json({ error: "User not found" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $pull: { "members.membersJoined": memberId },
        $push: { "members.membersAvoided": memberId },
      }
    );

    await User.updateOne(
      { _id: memberId },
      {
        $pull: { "projects.projectsJoined": project._id },
        $push: { "projects.projectsDeclined": project._id },
      }
    );

    res.json(project);
  } catch (error) {
    next(error);
  }
};
