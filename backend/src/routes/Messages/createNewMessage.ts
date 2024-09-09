import { Request, Response, NextFunction } from "express";
import Message from "../../models/Message.models";
import Friendship from "../../models/Friendship.models";

export const createNewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { senderId, content } = req.body;
  const { friendshipId } = req.params;

  if (!senderId || !content) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const newMessage = await Message.create({
      senderId: senderId,
      friendshipId: friendshipId,
      content: content,
      isRead: false,
    });

    await Friendship.findByIdAndUpdate(friendshipId, {
      $push: { messages: newMessage._id },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
