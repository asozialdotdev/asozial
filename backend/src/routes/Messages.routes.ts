import express, { Request, Response, NextFunction } from "express";
import Message from "../models/Message.models";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";
import { ObjectId } from "mongodb";

const messagesRouter = express.Router();

// GET request to get all messages between two users
// the :userId refers to the target user not the actual User
// frontend should send a request when the chat window is opened

messagesRouter.get(
  "/:friendshipId",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// POST request to create a new message

messagesRouter.post(
  "/:friendshipId",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export default messagesRouter;
