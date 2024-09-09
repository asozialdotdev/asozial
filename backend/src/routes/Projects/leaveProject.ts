import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const leaveProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const project = await Project.findById(projectId)
      .populate("owner", "info.username")
      .exec();

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!project.members?.membersJoined.includes(user._id)) {
      return res
        .status(400)
        .json({ error: "User is not a member of this project" });
    }

    if (!user.projects?.projectsJoined.includes(project._id)) {
      console.log("User is NOT in the projectsApplied array");
      return res
        .status(400)
        .json({ error: "User is not member of this project" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $pull: { "members.membersJoined": userId },
      }
    );

    await User.updateOne(
      { _id: userId },
      {
        $pull: { "projects.projectsJoined": project._id },
      }
    );

    res.json({ project, user });
  } catch (error) {
    next(error);
  }
};
