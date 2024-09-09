import express, { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Message from "../../models/Message.models";
import Friendship from "../../models/Friendship.models";

const friendshipsRouter = express.Router();

// POST friends to request friendships

friendshipsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { senderId, receiverId } = req.body;

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

      if (friendshipExists) {
        return res.status(409).json({ message: "Friendship already exists" });
      }

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

friendshipsRouter.put(
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

      await User.findByIdAndUpdate(friendship.senderId, {
        $pull: { "friends.pending": friendship.receiverId },
        $addToSet: { "friends.accepted": friendship.senderId },
      });

      await User.findByIdAndUpdate(friendship.receiverId, {
        $pull: { "friends.pending": friendship.senderId },
        $addToSet: { "friends.accepted": friendship.receiverId },
      });

      res.status(200).json(friendship);
    } catch (error) {
      console.error("Error accepting friendship:", error);
      next(error);
    }
  }
);

// PATCH friends to decline friendship request

friendshipsRouter.put(
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

      await User.findByIdAndUpdate(friendship.senderId, {
        $pull: { "friends.pending": friendship.receiverId },
        $push: { "friends.declined": friendship.senderId },
      });

      await User.findByIdAndUpdate(friendship.receiverId, {
        $pull: { "friends.pending": friendship.senderId },
        $push: { "friends.declined": friendship.receiverId },
      });

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
      const { actualUser } = req.query;

      const user = await User.findById(actualUser)
        .populate({
          path: "friends.pending", // Populate the 'friends.pending' array
          select: "info.username info.image", // Select only username and image fields
        })
        .exec();

      if (!user) {
        console.error("No user found");
        return res.status(404).send("No user found");
      }

      res.json(user.friends?.pending || []); // Return the pending friends or an empty array if none
    } catch (error) {
      console.error("Error fetching pending friendships:", error);
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

      const user = await User.findById(actualUser).populate("friends.declined");

      if (!user || !user.friends?.declined.length) {
        res.status(404).send("You don't have any declined friendships!");
        console.error("No declined friendships found");
        return;
      }

      res.json(user.friends.declined);
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
  "/:username/status",
  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      const userFriendships = await Friendship.find({
        $or: [
          { senderId: user._id },
          { receiverId: user._id },
          { friends: { $in: [user._id] } },
        ],
      })
        .populate({
          path: "friends",
          select: "username info.image",
          model: User,
        })
        .populate({
          path: "senderId receiverId",
          select: "username info.image",
          model: User,
        });

      const acceptedFriendships = await Promise.all(
        userFriendships
          .filter((friendship) => friendship.status === "accepted")
          .map(async (friendship) => {
            let mostRecentMessage = null;

            if (friendship.messages && friendship.messages.length > 0) {
              mostRecentMessage =
                friendship.messages[friendship.messages.length - 1];

              if (mostRecentMessage) {
                mostRecentMessage = await Message.findOne({
                  _id: mostRecentMessage._id,
                });
              }
            }

            return {
              ...friendship.toObject(),
              mostRecentMessage,
            };
          })
      );

      const pendingFriendships = userFriendships.filter(
        (friendship) => friendship.status === "pending"
      );
      const declinedFriendships = userFriendships.filter(
        (friendship) => friendship.status === "declined"
      );

      console.log({
        accepted: acceptedFriendships,
        pending: pendingFriendships,
        declined: declinedFriendships,
      });

      res.json({
        accepted: acceptedFriendships,
        pending: pendingFriendships,
        declined: declinedFriendships,
      });
    } catch (error: any) {
      console.error("Error fetching user friendships:", error);
      res.status(500).send("Error fetching user friendships");
    }
  }
);

export default friendshipsRouter;
