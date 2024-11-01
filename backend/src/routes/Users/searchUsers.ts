import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Friendship from "../../models/Friendship.models";

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, page = 1, limit = 10, actualUserId } = req.query;
  console.log("query", query);

  try {
    // Define the search query dynamically
    const searchQuery = query
      ? {
          $or: [
            { "info.username": { $regex: query, $options: "i" } },
            { "info.name": { $regex: query, $options: "i" } },
            {
              "skills.codingLanguages.language": {
                $regex: query,
                $options: "i",
              },
            },
            { "info.location": { $regex: query, $options: "i" } },
          ],
        }
      : {};

    // Aggregation pipeline to get user details, accepted, and pending friends count
    const usersAggregation = await User.aggregate([
      { $match: searchQuery },

      // Add a field to calculate owned and joined projects and friends count
      {
        $addFields: {
          totalProjectsOwned: {
            $size: { $ifNull: ["$projects.projectsOwned", []] },
          },
          totalProjectsMembers: {
            $size: { $ifNull: ["$projects.projectsJoined", []] },
          },
        },
      },

      // Lookup to find the accepted friends
      {
        $lookup: {
          from: "Friendship",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        { $eq: ["$senderId", "$$userId"] },
                        { $eq: ["$receiverId", "$$userId"] },
                      ],
                    },
                    { $eq: ["$status", "accepted"] },
                  ],
                },
              },
            },
          ],
          as: "acceptedFriends",
        },
      },

      // Lookup to find the pending friends
      {
        $lookup: {
          from: "Friendship",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        { $eq: ["$senderId", "$$userId"] },
                        { $eq: ["$receiverId", "$$userId"] },
                      ],
                    },
                    { $eq: ["$status", "pending"] },
                  ],
                },
              },
            },
          ],
          as: "pendingFriends",
        },
      },

      // Add fields to count the total number of accepted and pending friends
      {
        $addFields: {
          totalFriends: { $size: "$acceptedFriends" },
          hasPendingFriendship: { $gt: [{ $size: "$pendingFriends" }, 0] },
        },
      },

      // Project only the needed fields
      {
        $project: {
          "info.username": 1,
          "info.name": 1,
          "info.image": 1,
          "github.publicReposNumber": 1,
          "github.bio": 1,
          "info.location": 1,
          "skills.codingLanguages": 1,
          totalProjectsOwned: 1,
          totalProjectsMembers: 1,
          totalFriends: 1,
          hasPendingFriendship: 1, // Include pending friendship status
        },
      },

      // Pagination
      { $skip: (+page - 1) * +limit },
      { $limit: +limit },
    ]);

    // Fetch friendships to determine if the users found are friends or have pending status with the actual user
    const friendshipStatus = await Friendship.find({
      $or: [{ senderId: actualUserId }, { receiverId: actualUserId }],
    })
      .select("senderId receiverId status")
      .lean()
      .exec();

    // Create sets for accepted and pending friend IDs
    const acceptedFriendIds = new Set();
    const pendingFriendIds = new Set();
    friendshipStatus.forEach((friendship) => {
      if (friendship.status === "accepted") {
        if (friendship.senderId.toString() === actualUserId) {
          acceptedFriendIds.add(friendship.receiverId.toString());
        } else {
          acceptedFriendIds.add(friendship.senderId.toString());
        }
      } else if (friendship.status === "pending") {
        if (friendship.senderId.toString() === actualUserId) {
          pendingFriendIds.add(friendship.receiverId.toString());
        } else {
          pendingFriendIds.add(friendship.senderId.toString());
        }
      }
    });

    // Add friendship status to the users aggregation result
    const usersWithFriendshipStatus = usersAggregation.map((user) => ({
      ...user,
      isFriend: acceptedFriendIds.has(user._id.toString()),
      hasPendingFriendship: pendingFriendIds.has(user._id.toString()),
    }));

    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / +limit);

    res.json({
      users: usersWithFriendshipStatus,
      totalPages,
      currentPage: +page,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};
