import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";

const friendshipsRouter = express.Router();

// POST friends to request friendships

friendshipsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body", req.body);
    try {
      const { senderId, receiverId } = req.body;
      console.log("senderId", senderId);
      console.log("receiverId", receiverId);

      if (!senderId) {
        res.status(404).send("Sender not found");
        console.error("Sender not found");
        return;
      }

      if (!receiverId) {
        res.status(404).send("Receiver not found");
        console.error("Receiver not found");
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

      //add friendship to sender and receiver
      await User.findByIdAndUpdate(senderId, {
        $push: { friendsPending: receiverId },
      });

      await User.findByIdAndUpdate(receiverId, {
        $push: { friendsPending: senderId },
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
      const { userId } = req.body;
      const { friendshipId } = req.params;

      const foundFriendship = await Friendship.findById(friendshipId);

      if (!foundFriendship) {
        res.status(404).send("Friendship not found");
        console.error("Friendship not found");
        return;
      }

      if (
        foundFriendship.receiverId.toString() !== userId ||
        foundFriendship.senderId.toString() !== userId
      ) {
        res
          .status(403)
          .send("You are not authorized to accept this friendship");
        console.error("Unauthorized to accept friendship");
        return;
      }

      foundFriendship.status = "accepted";
      await foundFriendship.save();

      res.status(200).json(foundFriendship);
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
      const { receiverId } = req.body;
      const { friendshipId } = req.params;

      const friendship = await Friendship.findOneAndUpdate(
        {
          _id: friendshipId,
          receiverId: receiverId, // Ensures only the receiver can decline
        },
        { status: "declined" },
        { new: true } // Return the updated document
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
      const { actualUser } = req.body;

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
      const { actualUser } = req.body;

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
      const { actualUser } = req.body;
      const deleteFriendship = await Friendship.findOneAndDelete({
        $or: [{ senderId: actualUser }, { receiverId: actualUser }],
        status: "accepted",
      });
      if (!deleteFriendship) {
        res.status(404).send("Friendship not found or unauthorized");
        console.error("Friendship not found or unauthorized");
        return;
      }
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

export default friendshipsRouter;
