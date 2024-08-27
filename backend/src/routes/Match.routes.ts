import express, { Request, Response, NextFunction } from "express";

import User from "../models/User.models";
import Project from "../models/Project.models";
import UserMatch from "../models/UserMatch.models";
import ProjectMatch from "../models/ProjectMatch.models";

const matchRouter = express.Router();

// ------------- USER ------------- //

// GET user to Match (tinderlike)

matchRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { actualUser } = req.body;

      const avoidedUsers = await User.find({
        $or: [
          { _id: { $in: actualUser.matches.users.declined } },
          {
            $nor: [
              {
                techStack: {
                  $elemMatch: { $in: actualUser.skills.codingLanguages },
                },
              },
              {
                languagesSpoken: {
                  $elemMatch: { $in: actualUser.skills.languagesSpoken },
                },
              },
            ],
          },
        ],
      });

      const filteredUsers = await User.aggregate([
        {
          $match: {
            _id: { $nin: avoidedUsers.map((user) => user._id) },
          },
        },
        {
          $addFields: {
            techStackMatches: {
              $size: {
                $setIntersection: [
                  "$techStack",
                  actualUser.skills.codingLanguages,
                ],
              },
            },
            languagesSpokenMatches: {
              $size: {
                $setIntersection: [
                  "$languagesSpoken",
                  actualUser.skills.languagesSpoken,
                ],
              },
            },
            totalMatches: {
              $add: ["$techStackMatches", "$languagesSpokenMatches"],
            },
          },
        },
        {
          $sort: { totalMatches: -1 },
        },
      ]);

      const suggestedUserIds = filteredUsers.map((user) => user._id);

      await User.updateOne(
        { _id: actualUser._id },
        {
          $addToSet: { "matches.users.suggested": { $each: suggestedUserIds } },
        }
      );

      res.status(200).json(filteredUsers);
    } catch (error) {
      next(error);
    }
  }
);

// POST to create a Match (tinderlike)

matchRouter.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { actualUserId, targetUserId } = req.body;

      const actualUser = await User.findById(actualUserId);
      const targetUser = await User.findById(targetUserId);

      if (!actualUser || !targetUser) {
        res.status(404).send("One or both users not found");
        console.error("One or both users not found");
        return;
      }

      const isTargetSuggestedToActual =
        actualUser.matches?.users?.suggested.includes(targetUserId);
      if (!isTargetSuggestedToActual) {
        res.status(400).send("Target user not suggested to actual user");
        console.error("Target user not suggested to actual user");
        return;
      }

      const isActualSuggestedToTarget =
        targetUser.matches?.users?.suggested.includes(actualUserId);
      if (!isActualSuggestedToTarget) {
        res.status(400).send("Actual user not suggested to target user");
        console.error("Actual user not suggested to target user");
        return;
      }

      await User.updateOne(
        { _id: actualUserId },
        {
          $pull: { "matches.users.suggested": targetUserId },
          $addToSet: { "matches.users.pending": targetUserId }, // prevent duplicates
        }
      );

      await User.updateOne(
        { _id: targetUserId },
        {
          $pull: { "matches.users.suggested": actualUserId },
          $addToSet: { "matches.users.pending": actualUserId }, // prevent duplicetes
        }
      );

      const newUserMatch = new UserMatch({
        userOne: actualUserId,
        userTwo: targetUserId,
        status: "pending",
      });

      await newUserMatch.save();

      const populatedActualUser = await User.findById(actualUser._id).populate(
        "matches.users.pending"
      );
      const populatedTargetUser = await User.findById(targetUser._id).populate(
        "matches.users.pending"
      );

      res.status(200).json({
        message: "Match request sent successfully and users updated",
        actualUser: populatedActualUser,
        targetUser: populatedTargetUser,
      });
    } catch (error) {
      console.error("Error matching users:", error);
      next(error);
    }
  }
);

// PUT to accept matches

matchRouter.put(
  "/users/accept",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { targetUserId, matchId } = req.body;

      const userMatch = await UserMatch.findById(matchId);

      if (!userMatch) {
        res.status(404).json({ error: "Match not found" });
        console.error("Match not found");
        return;
      }

      if (userMatch.userTwo.toString() !== targetUserId.toString()) {
        res.status(403).json({ error: "Not authorized to accept this match" });
        console.error("Not authorized to accept this match");
        return;
      }

      userMatch.status = "accepted";
      await userMatch.save();

      await User.updateOne(
        { _id: userMatch.userOne },
        {
          $pull: { "matches.user.pending": targetUserId },
          $addToSet: { "matches.user.accepted": targetUserId },
        }
      );

      await User.updateOne(
        { _id: userMatch.userTwo },
        {
          $pull: { "matches.user.pending": userMatch.userTwo },
          $addToSet: { "matches.user.accepted": userMatch.userTwo },
        }
      );

      res
        .status(200)
        .json({ message: "Match accepted successfully", match: userMatch });
    } catch (error) {
      console.error("Error accepting match:", error);
      next(error);
    }
  }
);

// PUT to decline matches

matchRouter.put(
  "/users/decline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { targetUserId, matchId } = req.body;

      const userMatch = await UserMatch.findById(matchId);

      if (!userMatch) {
        res.status(404).json({ error: "Match not found" });
        console.error("Match not found");
        return;
      }

      if (userMatch.userTwo.toString() !== targetUserId.toString()) {
        res.status(403).json({ error: "Not authorized to decline this match" });
        console.error("Not authorized to decline this match");
        return;
      }

      userMatch.status = "declined";
      await userMatch.save();

      await User.updateOne(
        { _id: userMatch.userOne },
        {
          $pull: { "matches.user.pending": targetUserId },
          $addToSet: { "matches.user.declined": targetUserId },
        }
      );

      await User.updateOne(
        { _id: userMatch.userTwo },
        {
          $pull: { "matches.user.pending": userMatch.userTwo },
          $addToSet: { "matches.user.declined": userMatch.userTwo },
        }
      );

      res
        .status(200)
        .json({ message: "Match declined successfully", match: userMatch });
    } catch (error) {
      console.error("Error declining match:", error);
      next(error);
    }
  }
);

// ------------- PROJECT ------------- //

// GET request to get project (tinderlike)

matchRouter.get(
  "/projects",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { actualUser, targetProject } = req.body;

      const user = await User.findById(actualUser);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isProjectAlreadyMatched =
        user.matches?.projects?.suggested.includes(targetProject) ||
        user.matches?.projects?.pending.includes(targetProject) ||
        user.matches?.projects?.accepted.includes(targetProject) ||
        user.matches?.projects?.declined.includes(targetProject);

      if (isProjectAlreadyMatched) {
        return res.status(200).json({
          message: "Project already matched or suggested to the user.",
        });
      }

      const filteredProjects = await Project.aggregate([
        {
          $match: {
            _id: {
              $nin: user.matches?.projects?.suggested.concat(
                user.matches?.projects?.pending,
                user.matches?.projects?.accepted,
                user.matches?.projects?.declined
              ),
            },
            mainLanguage: { $in: user.skills?.languagesSpoken },
          },
        },
        {
          $addFields: {
            techStackMatches: {
              $size: {
                $setIntersection: [
                  "$techStack",
                  user.skills?.codingLanguages.map((cl: any) => cl.language),
                ],
              },
            },
          },
        },
        {
          $sort: { techStackMatches: -1 },
        },
      ]);

      user.matches?.projects?.suggested.push(targetProject);
      await user.save();

      res.status(200).json({
        message: "Project matched successfully",
        suggestedProjects: filteredProjects,
      });
    } catch (error) {
      console.error("Error fetching matched projects:", error);
      next(error);
    }
  }
);

// POST request to match project (tinderlike)

matchRouter.post(
  "/projects",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// PUT request to accept project match

matchRouter.put(
  "/projects/accept",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// PUT request to decline project match

matchRouter.put(
  "/projects/decline",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export default matchRouter;
