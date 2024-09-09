import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import UserMatch from "../../models/UserMatch.models";

export const declineUserMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
