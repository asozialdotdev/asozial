import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";

const usersRouter = express.Router();

// GET all users

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

// GET 1 user

usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      res.json(foundUser);
    } catch (error) {
      next(error);
    }
  }
);

// GET user friends
// rendered in the /users

usersRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      if (!foundUser) {
        throw new Error("User not found");
      }

      const friendships = await Friendship.find({
        $or: [
          { user1: foundUser._id, status: "accepted" },
          { user2: foundUser._id, status: "accepted" },
        ],
      });

      const friendIds = friendships
        .flatMap((friendship) => [
          friendship.senderId.toString(),
          friendship.receiverId.toString(),
        ])
        .filter((id) => id !== foundUser._id.toString());

      const friends = await User.find({ _id: { $in: friendIds } });

      res.json({
        user: foundUser,
        friends: friends,
      });
    } catch (error) {
      next(error);
    }
  }
);
// GET user to Match (tinderlike)

// GET user's friends and user's activities

export default usersRouter;
