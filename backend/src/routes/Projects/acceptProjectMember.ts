import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const acceptProjectMember = async (
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

    console.log("Project owner", project?.owner);
    console.log("User ID", userId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    if (project.owner._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to accept this user" });
    }

    if (project.members?.membersJoined.includes(memberId)) {
      return res
        .status(400)
        .json({ error: "User is already a member of this project" });
    }

    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $push: { "members.membersJoined": memberId },
        $pull: { "members.membersApplied": memberId },
      }
    );

    await User.updateOne(
      { _id: memberId },
      {
        $push: { "projects.projectsJoined": project._id },
        $pull: { "projects.projectsApplied": project._id },
      }
    );

    res.status(200).json({ project, member });
  } catch (error) {
    next(error);
  }
};
