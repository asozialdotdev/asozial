import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const getUserMatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
