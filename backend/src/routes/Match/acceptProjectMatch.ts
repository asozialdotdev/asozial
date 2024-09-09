import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Project from "../../models/Project.models";
import ProjectMatch from "../../models/ProjectMatch.models";

export const acceptProjectMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId, matchId } = req.body;
    const projectMatch = await ProjectMatch.findById(matchId);

    if (!projectMatch) {
      res.status(404).json({ error: "Match not found" });
      console.error("Match not found");
      return;
    }

    const project = await Project.findById(projectMatch.project);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      console.error("Project not found");
      return;
    }

    if (project.owner.toString() !== ownerId.toString()) {
      res.status(403).json({ error: "Not authorized to accept this match" });
      console.error("Not authorized to accept this match");
      return;
    }

    projectMatch.status = "accepted";
    await projectMatch.save();

    await User.updateOne(
      { _id: projectMatch.user },
      {
        $pull: { "matches.projects.pending": projectMatch.project },
        $addToSet: { "matches.projects.accepted": projectMatch.project },
      }
    );

    await Project.updateOne(
      { _id: projectMatch.project },
      {
        $pull: { "members.membersApplied": projectMatch.user },
        $addToSet: { "members.membersAccepted": projectMatch.user },
      }
    );

    res
      .status(200)
      .json({ message: "User accepted to the project", projectMatch });
  } catch (error) {
    console.error("Error accepting project match:", error);
    next(error);
  }
};
