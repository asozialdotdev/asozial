import express, { Request, Response, NextFunction } from "express";
import UserPost from "../models/UserPost.models";
import Friendship from "../models/Friendship.models";
import { isAuthenticated, verifyJWT } from "../middleware/jwt.middleware";

const usersPostRouter = express.Router();

// POST /user-posts to create a new post(stauts, thought)

usersPostRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;

      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }
      const newPost = await UserPost.create({
        userId: actualUser._id,
        title,
        content,
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// GET all the users-posts

usersPostRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await UserPost.find().populate("userId");
      if (!posts) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

// GET users-posts from friends

usersPostRouter.get(
  "/friends",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;

      // Get all friendships where the user is either sender or receiver
      const friendships = await Friendship.find({
        $or: [
          { senderId: actualUser._id, status: "accepted" },
          { receiverId: actualUser._id, status: "accepted" },
        ],
      });

      // Extract friend IDs
      const friendIds = friendships.map((friendship) =>
        friendship.senderId.equals(actualUser._id)
          ? friendship.receiverId
          : friendship.senderId
      );

      // Get all posts made by friends
      const friendsPosts = await UserPost.find({
        userId: { $in: friendIds },
      }).populate("userId");

      res.json(friendsPosts);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE posts from user

usersPostRouter.delete(
  "/:userPostId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    try {
      const userPost = await UserPost.findById(req.params.userPostId);
      if (!userPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (userPost.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      await UserPost.findByIdAndDelete(req.params.userPostId);
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

export default usersPostRouter;
