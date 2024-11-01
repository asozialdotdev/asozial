import { Request, Response, NextFunction } from "express";
import Friendship from "../../models/Friendship.models";
import Message from "../../models/Message.models";
import User from "../../models/User.models";

export const getFriendsMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { friendshipId } = req.params;
  try {
    const friendship = await Friendship.findById(friendshipId)
      .populate({
        path: "messages",
        select: "senderId content createdAt",
        model: Message,
      })
      .populate({
        path: "friends",
        select: "username info.image",
        model: User,
      });

    if (friendship) {
      const messageDetails = friendship.messages.map((message: any) => ({
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
      }));

      console.log(messageDetails);
    }

    //only updating when one user reads the messages

    await Message.updateMany(
      { friendshipId: friendshipId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json(friendship);
  } catch (error) {
    next(error);
  }
};
