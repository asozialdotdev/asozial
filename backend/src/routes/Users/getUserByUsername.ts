import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Friendship from "../../models/Friendship.models";

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ "info.username": req.params.username });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const userId = user._id;

  try {
    const results = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: "Project",
          localField: "projects.projectsOwned",
          foreignField: "_id",
          as: "projectsOwned",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "Project",
          localField: "projects.projectsJoined",
          foreignField: "_id",
          as: "projectsJoined",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                slug: 1,
                owner: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "projectsJoined.owner",
          foreignField: "_id",
          as: "projectOwners",
          pipeline: [
            {
              $project: {
                _id: 1,
                "info.username": 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          projectsJoined: {
            $map: {
              input: "$projectsJoined",
              as: "project",
              in: {
                $mergeObjects: [
                  "$$project",
                  {
                    username: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$projectOwners",
                            cond: { $eq: ["$$this._id", "$$project.owner"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          projectsOwnedCount: { $size: "$projectsOwned" },
          projectsJoinedCount: { $size: "$projectsJoined" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          info: 1,
          github: 1,
          skills: 1,
          friendsAccepted: 1,
          projectsOwned: 1,
          projectsJoined: 1,
          projectsOwnedCount: 1,
          projectsJoinedCount: 1,
        },
      },
    ]);

    if (!results || results.length === 0) {
      throw new Error("User not found");
    }

    const user = results[0];

    const friendshipStatus = await Friendship.findOne({
      $or: [{ senderId: userId }, { receiverId: userId }],
      status: "accepted",
    });

    const isFriend = !!friendshipStatus;

    res.json({
      user,
      counts: {
        projectsOwnedCount: user.projectsOwnedCount,
        projectsJoinedCount: user.projectsJoinedCount,
      },
      isFriend,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    next(error);
  }
};
