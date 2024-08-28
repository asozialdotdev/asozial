import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";
import Project from "../models/Project.models";

const usersRouter = express.Router();

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
