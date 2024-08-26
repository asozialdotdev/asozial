import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";
import Project from "../models/Project.models";
import { Types } from "mongoose";

const usersRouter = express.Router();

// POST user to Match (tinderlike)

usersRouter.post(
  "/match",
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

      if (!actualUser?.matches?.users?.accepted.includes(targetUserId)) {
        actualUser?.matches?.users?.accepted.push(targetUserId);
      }

      if (!targetUser?.matches?.users?.accepted.includes(actualUserId)) {
        targetUser?.matches?.users?.accepted.push(actualUserId);
      }

      await actualUser.save();
      await targetUser.save();

      const populatedActualUser = await User.findById(actualUser._id).populate(
        "matches.users.accepted"
      );
      const populatedTargetUser = await User.findById(targetUser._id).populate(
        "matches.users.accepted"
      );

      res.status(200).json({
        message: "Users matched successfully",
        actualUser: populatedActualUser,
        targetUser: populatedTargetUser,
      });
    } catch (error) {
      console.error("Error matching users:", error);
      next(error);
    }
  }
);

// GET user friends
// rendered in the /users route

usersRouter.get("/:username", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ "info.username": req.params.username });
    if (!user) {
      console.log("User not found");
    }

    res.json(user);

    // const friendships = await Friendship.find({
    //   $or: [
    //     { senderId: foundUser._id, status: "accepted" },
    //     { receiverId: foundUser._id, status: "accepted" },
    //   ],
    // });

    // const friendIds = friendships
    //   .flatMap((friendship) => [
    //     friendship.senderId.toString(),
    //     friendship.receiverId.toString(),
    //   ])
    //   .filter((id) => id !== foundUser._id.toString());

    // const friends = await User.find({ _id: { $in: friendIds } });

    // return res.json({
    //   user: foundUser,
    //   friends: friends,
    // });
  } catch (error: any) {
    console.log("Error fetching user by username:", error);
  }
});

// GET all users for the global search

usersRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.find();
      res.json(foundUser);
    } catch (error) {
      next(error);
    }
  }
);

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

// GET user to Match (tinderlike)

usersRouter.get(
  "/match",
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
                  actualUser.info.languagesSpoken,
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

      res.status(200).json(filteredUsers);
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
