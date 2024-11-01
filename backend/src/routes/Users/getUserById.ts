import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Friendship from "../../models/Friendship.models";
import { ObjectId } from "mongodb";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const results = await User.aggregate([
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "friends.accepted",
          foreignField: "_id",
          as: "friendsAccepted",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "projects.projectsOwned",
          foreignField: "_id",
          as: "projectsOwned",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "projects.projectsJoined",
          foreignField: "_id",
          as: "projectsJoined",
        },
      },
      {
        $addFields: {
          friendsCount: { $size: "$friendsAccepted" },
          projectsOwnedCount: { $size: "$projectsOwned" },
          projectsJoinedCount: { $size: "$projectsJoined" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          friendsAccepted: 1,
          projectsOwned: 1,
          projectsJoined: 1,
          friendsCount: 1,
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
        friendsCount: user.friendsCount,
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
