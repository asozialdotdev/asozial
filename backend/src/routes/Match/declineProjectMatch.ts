import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Project from "../../models/Project.models";
import ProjectMatch from "../../models/ProjectMatch.models";

export const declineProjectMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId, matchId } = req.body;

    const projectMatch = await ProjectMatch.findById(matchId);

    if (!projectMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    const project = await Project.findById(projectMatch.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({
        message:
          "Only the project owner can accept or decline the match request",
      });
    }

    projectMatch.status = "declined";
    await projectMatch.save();

    await User.updateOne(
      { _id: projectMatch.user },
      {
        $pull: { "matches.projects.pending": project._id },
        $addToSet: { "matches.projects.declined": project._id },
      }
    );

    await Project.updateOne(
      { _id: project._id },
      {
        $pull: { "members.membersApplied": projectMatch.user },
        $addToSet: { "members.membersDeclined": projectMatch.user },
      }
    );

    res
      .status(200)
      .json({ message: "User declined for the project", projectMatch });
  } catch (error) {
    console.error("Error declining project match:", error);
    next(error);
  }
};
