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
        $or: [{ friends: receiverId, senderId }],
      });

      if (friendshipExists) return;

      const newFriendship = await Friendship.create({
        senderId,
        receiverId,
        status: "pending",
      });

      await User.findByIdAndUpdate(senderId, {
        $push: { "friends.pending": receiverId },
      });

      await User.findByIdAndUpdate(receiverId, {
        $push: { "friends.pending": senderId },
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

      const friendship = await Friendship.findOneAndUpdate(
        {
          _id: friendshipId,
          receiverId: userId,
        },
        { status: "accepted" },
        { new: true }
      );

      if (!friendship) {
        res
          .status(404)
          .send(
            "Friendship not found or you are not authorized to accept this request."
          );
        console.error(
          "Friendship not found or unauthorized attempt to accept."
        );
        return;
      }

      friendship.friends.push(userId, friendship.senderId);

      await friendship.save();

      res.status(200).json(friendship);
    } catch (error) {
      console.error("Error accepting friendship:", error);
      next(error);
    }
  }
);

// PATCH friends to decline friendship request

friendshipsRouter.patch(
  "/:friendshipId/decline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const { friendshipId } = req.params;

      const friendship = await Friendship.findOneAndUpdate(
        {
          _id: friendshipId,
          receiverId: userId,
        },
        { status: "declined" },
        { new: true }
      );

      if (!friendship) {
        res
          .status(404)
          .send(
            "Friendship not found or you are not authorized to decline this request."
          );
        console.error(
          "Friendship not found or unauthorized attempt to decline."
        );
        return;
      }

      res.status(200).json(friendship);
    } catch (error) {
      console.error("Error declining friendship:", error);
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

friendshipsRouter.get(
  "/:userId/status",
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      const friendsAcceptedDetails = user.friends?.accepted
        ? await Promise.all(
            user.friends?.accepted.map(async (friend) => {
              const friendDetails = await User.findById(friend).select(
                "info.username info.image"
              );
              if (!friendDetails) return null;
              const response = {
                id: friendDetails._id,
                info: {
                  username: friendDetails.info?.username || "Kreuzbär",
                  image: friendDetails.info?.image || "",
                },
              };
              return response;
            })
          )
        : [];

      const friendsPendingDetails = user.friends?.pending
        ? await Promise.all(
            user.friends?.pending.map(async (friend) => {
              const friendDetails = await User.findById(friend).select(
                "info.username info.image"
              );
              if (!friendDetails) return null;
              const response = {
                id: friendDetails._id,
                info: {
                  username: friendDetails.info?.username,
                  image: friendDetails.info?.image,
                },
              };
              return response;
            })
          )
        : [];

      const friendsRejectedDetails = user.friends?.declined
        ? await Promise.all(
            user.friends?.declined.map(async (friend) => {
              const friendDetails = await User.findById(friend).select(
                "info.username info.image"
              );
              console.log("friendDetails", friendDetails);
              if (!friendDetails) return null;
              const response = {
                id: friendDetails._id,
                info: {
                  username: friendDetails.info?.username,
                  image: friendDetails.info?.image,
                },
              };
              return response;
            })
          )
        : [];

      console.log("friendsAcceptedDetails", friendsAcceptedDetails);
      console.log("friendsPendingDetails", friendsPendingDetails);
      console.log("friendsRejectedDetails", friendsRejectedDetails);

      res.json({
        friendsAccepted: friendsAcceptedDetails,
        friendsPending: friendsPendingDetails,
        friendsRejected: friendsRejectedDetails,
      });
    } catch (error: any) {
      console.error("Error fetching user friendships:", error);
      res.status(500).send("Error fetching user friendships");
    }
  }
);

export default friendshipsRouter;
