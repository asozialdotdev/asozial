import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import UserMatch from "../../models/UserMatch.models";

export const createUserMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
