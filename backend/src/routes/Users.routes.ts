import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";
import { ObjectId } from "mongodb";

const usersRouter = express.Router();

usersRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const { query, page = 1, limit = 10, actualUserId } = req.query;

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
            ],
          }
        : {};

      // Aggregation pipeline to get user details and accepted friends count
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

        // Lookup to find the accepted friends count
        {
          $lookup: {
            from: "Friendship",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$status", "accepted"] },
                      {
                        $or: [
                          { $eq: ["$senderId", "$$userId"] },
                          { $eq: ["$receiverId", "$$userId"] },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "acceptedFriends",
          },
        },

        // Calculate the total number of accepted friends
        {
          $addFields: {
            totalFriends: { $size: "$acceptedFriends" },
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
          },
        },

        // Pagination
        { $skip: (+page - 1) * +limit },
        { $limit: +limit },
      ]);

      // Fetch friendships to determine if the users found are friends with the actual user
      const friendshipStatus = await Friendship.find({
        $or: [{ senderId: actualUserId }, { receiverId: actualUserId }],
        status: "accepted",
      })
        .select("senderId receiverId")
        .lean()
        .exec();

      // Create a set of friend IDs
      const friendIds = new Set();
      friendshipStatus.forEach((friendship) => {
        if (friendship.senderId.toString() === actualUserId) {
          friendIds.add(friendship.receiverId.toString());
        } else {
          friendIds.add(friendship.senderId.toString());
        }
      });

      // Add friendship status to the users aggregation result
      const usersWithFriendshipStatus = usersAggregation.map((user) => ({
        ...user,
        isFriend: friendIds.has(user._id.toString()),
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
  }
);

usersRouter.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// GET 1 user with with friendship status

usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// GET logged in user for user profile

usersRouter.get(
  "/account",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req.body;
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.put("/", async (req, res, next) => {
  const { userId, website, company, location, email, bio } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "info.website": website,
        "info.company": company,
        "info.location": location,
        "info.email": email,
        "github.bio": bio,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
});

usersRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const { _id, codingLanguages, github } = req.body;
    ("received");
    codingLanguages;
    github;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        codingLanguages,
        github,
      },
      { new: true }
    );
    ("updated");
    res.json(updatedUser);
  } catch (error: any) {}
});

export default usersRouter;
