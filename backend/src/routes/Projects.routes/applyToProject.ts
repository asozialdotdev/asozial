import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const applyToProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.projectId)
      .populate("owner", "info.username")
      .exec();
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (project.members?.membersApplied.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User already applied to be a member" });
    }

    if (project.members?.membersJoined.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User is already a member of this project" });
    }

    if (user.projects?.projectsApplied.includes(project._id)) {
      return res
        .status(400)
        .json({ error: "User already applied to this project" });
    }
    if (user.projects?.projectsJoined.includes(project._id)) {
      console.log("User is in the projectsJoined array");
      return res
        .status(400)
        .json({ error: "User already applied to this project" });
    }

    await Project.updateOne(
      { _id: project._id },
      {
        $push: { "members.membersApplied": userId },
      }
    );

    await User.updateOne(
      { _id: userId },
      {
        $push: { "projects.projectsApplied": project._id },
      }
    );

    console.log("Project applied>>>>>>>>>>", project);
    console.log("User applied>>>>>>>>>>", user);
    res.status(200).json({ project, user });
  } catch (error) {
    next(error);
  }
};
