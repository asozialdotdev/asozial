import { Request, Response, NextFunction } from "express";
import Friendship from "../../models/Friendship.models";
import User from "../../models/User.models";
import Message from "../../models/Message.models";

export const getFriendshipStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
