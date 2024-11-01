import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Friendship from "../../models/Friendship.models";

export const createFriendship = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
