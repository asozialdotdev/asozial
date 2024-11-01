import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const restoreProjectMember = async (
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

    if (!project.members?.membersAvoided.includes(memberId)) {
      return res
        .status(401)
        .json({ error: "User is not a member of this project" });
    }

    if (project.owner._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to remove this user" });
    }

    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $pull: { "members.membersAvoided": memberId },
        $push: { "members.membersJoined": memberId },
      }
    );

    await User.updateOne(
      { _id: memberId },
      {
        $pull: { "projects.projectsDeclined": project._id },
        $push: { "projects.projectsJoined": project._id },
      }
    );

    res.json({ project, member });
  } catch (error) {
    next(error);
  }
};
