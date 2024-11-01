import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Project from "../../models/Project.models";
import ProjectMatch from "../../models/ProjectMatch.models";

export const createProjectMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { actualUserId, projectId } = req.body;

    const actualUser = await User.findById(actualUserId);
    const foundProject = await Project.findById(projectId);

    if (!foundProject || !actualUser) {
      res.status(404).json({ error: "Project or User not found" });
      console.error("Project or User not found");
      return;
    }

    const isProjectSuggestedToUser =
      actualUser.matches?.projects?.suggested.includes(projectId);

    if (!isProjectSuggestedToUser) {
      res.status(403).json({ error: "Project not suggested to this user" });
      console.error("Project not suggested to this user");
      return;
    }

    await User.updateOne(
      { _id: actualUserId },
      {
        $pull: { "matches.projects.suggested": projectId },
        $addToSet: { "matches.projects.pending": projectId },
      }
    );

    await Project.updateOne(
      { _id: projectId },
      { $addToSet: { "members.membersApplied": actualUserId } }
    );

    const newProjectMatch = new ProjectMatch({
      user: actualUserId,
      project: projectId,
      status: "pending",
    });

    await newProjectMatch.save();

    const populatedActualUser = await User.findById(actualUser._id).populate(
      "matches.projects.pending"
    );
    const populatedFoundProject = await Project.findById(projectId).populate(
      "members.membersApplied"
    );

    res.status(200).json({
      message: "Match request sent successfully, user and project updated",
      actualUser: populatedActualUser,
      foundProject: populatedFoundProject,
    });
  } catch (error) {
    console.error("Error matching user and project:", error);
    next(error);
  }
};
