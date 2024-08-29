import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";

const usersRouter = express.Router();

usersRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const { query, page = 1, limit = 10, actualUserId } = req.query; // Accept actualUserId as a query parameter

    try {
      const searchQuery = query
        ? {
            $or: [
              { "info.username": { $regex: query, $options: "i" } },
              { "info.name": { $regex: query, $options: "i" } },
            ],
          }
        : {};

      // Use aggregation to fetch user data along with additional computed fields
      const usersAggregation = await User.aggregate([
        { $match: searchQuery }, // Apply the search query

        // Calculate total projects owned and joined by counting the array length
        {
          $addFields: {
            totalProjectsOwned: {
              $size: { $ifNull: ["$projects.projectsOwned", []] },
            }, // Calculate total owned projects
            totalProjectsMembers: {
              $size: { $ifNull: ["$projects.projectsJoined", []] },
            }, // Calculate total member projects
            totalFriends: { $size: { $ifNull: ["$friends.accepted", []] } }, // Calculate total friends from accepted friendships
          },
        },
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
        { $skip: (+page - 1) * +limit }, // Pagination
        { $limit: +limit }, // Limit
      ]);

      // Fetch friendships to determine if the users found are friends with the actual user
      const friendshipStatus = await Friendship.find({
        $or: [{ senderId: actualUserId }, { receiverId: actualUserId }],
        status: "accepted", // Only check for accepted friendships
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
        isFriend: friendIds.has(user._id.toString()), // Check if user ID is in the friendIds set
      }));

      const totalUsers = await User.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalUsers / +limit);

      console.log({
        users: usersWithFriendshipStatus,
        totalPages,
        currentPage: +page,
      });

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

usersRouter.get("/:username", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ "info.username": req.params.username });
    if (!user) {
      console.log("User not found");
    }

    res.json(user);
  } catch (error: any) {
    console.log("Error fetching user by username:", error);
  }
});

// GET 1 user to display with friendship condition

usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUserId = req.params._id;
      const targetUserId = req.params.userId;

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      const friendships = await Friendship.findOne({
        $or: [
          { senderId: currentUserId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: currentUserId },
        ],
        status: "accepted",
      });

      if (friendships) {
        res.json({
          user: targetUser,
        });
      } else {
        res.json({
          message: "You are not friend with this user",
          basicInfo: {
            username: targetUser.info?.username,
            name: targetUser.info?.name,
            email: targetUser.info?.email,
            image: targetUser.info?.image,
          },
        });
      }
    } catch (error) {
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

usersRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const { _id, codingLanguages, github } = req.body;
    console.log("received");
    console.log(codingLanguages);
    console.log(github);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        codingLanguages,
        github,
      },
      { new: true }
    );
    console.log("updated");
    res.json(updatedUser);
  } catch (error: any) {
    console.log("Error updating user", error.message);
  }
});

export default usersRouter;
