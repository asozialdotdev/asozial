import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";

const friendshipsRouter = express.Router();

// POST friends to request friendships

friendshipsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const senderId = (req as any).payload.user;
      const receiverId = await User.findById(req.params.userId);

      if (!receiverId) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      const friendshipExists = await Friendship.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (friendshipExists) return;

      const newFriendship = await Friendship.create({
        senderId,
        receiverId,
        status: "pending",
      });

      res.status(201).json(newFriendship);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH friends to accept friendship request

friendshipsRouter.patch(
  "/:friendshipId/accept",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const friendshipId = req.params.friendshipId;
      const friendship = await Friendship.findById(friendshipId);

      if (!friendship) {
        res.status(404).send("Friendship not found");
        console.error("Friendship not found");
        return;
      }

      if (friendship.receiverId.toString() !== (req as any).payload.user) {
        res
          .status(403)
          .send("You are not authorized to accept this friendship");
        console.error("Unauthorized to accept friendship");
        return;
      }

      friendship.status = "accepted";
      await friendship.save();

      res.status(200).json(friendship);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH friends to decline friendship request

friendshipsRouter.patch(
  "/:friendshipId/decline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const friendshipId = req.params.friendshipId;

      const friendship = await Friendship.findOneAndUpdate(
        {
          _id: friendshipId,
          receiverId: (req as any).payload.user._id,  // Ensures only the receiver can decline
        },
        { status: "declined" },
        { new: true }  // Return the updated document
      );

      if (!friendship) {
        res.status(404).send("Friendship not found or unauthorized");
        console.error("Friendship not found or unauthorized");
        return;
      }

      res.status(200).json(friendship);
    } catch (error) {
      next(error);
    }
  }
);


// GET all pending friendships

friendshipsRouter.get(
  "/pending",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;

      const pendingFriendships = await Friendship.find({
        $or: [
          { receiverId: actualUser, status: "pending" },
          { senderId: actualUser, status: "pending" },
        ],
      });

      if (!pendingFriendships) {
        res.status(404).send("You don't have any pending friendships!");
        console.error("No pending friendships found");
        return;
      }

      res.json(pendingFriendships);
    } catch (error) {
      next(error);
    }
  }
);

// GET all declined friendships

friendshipsRouter.get(
  "/declined",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;

      const declinedFriendships = await Friendship.find({
        $or: [
          { receiverId: actualUser, status: "declined" },
          { senderId: actualUser, status: "declined" },
        ],
      });

      if (!declinedFriendships) {
        res.status(404).send("You don't have any declined friendships!");
        console.error("No declined friendships found");
        return;
      }

      res.json(declinedFriendships);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE friendships

friendshipsRouter.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteResult = await Friendship.deleteMany({
        $or: [
          { senderId: req.body.senderId, receiverId: req.body.receiverId },
          { senderId: req.body.receiverId, receiverId: req.body.senderId },
        ],
        status: "accepted",
      });

      if (deleteResult.deletedCount === 0) {
        res.status(404).send("Friendship not found or not accepted");
        console.error("Friendship not found or not accepted");
        return;
      }

      res.status(200).json({ message: "Friendship deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default friendshipsRouter;
