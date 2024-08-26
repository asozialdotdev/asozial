import express, { Request, Response, NextFunction } from "express";
import Message from "../models/Message.models";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";

const messagesRouter = express.Router();

// POST request to create a new message

messagesRouter.post(
  "/:friendshipId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { actualUser, targetUser } = req.body;
    const { friendshipId } = req.params;

    const foundTargetUser = User.findById(targetUser);

    const friendshipExists = await User.findOne({
      "friends.accepted": targetUser,
    });

    if (!foundTargetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!friendshipExists) {
      return res.status(403).json({
        message: "You can't send messages to this user.",
      });
    }

    try {
      const newMessage = await Message.create({
        senderId: actualUser,
        receiverId: foundTargetUser,
        title: req.body.title,
        content: req.body.content,
        isRead: false,
      });

      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to get all messages between two users
// the :userId refers to the target user not the actual User
// frontend should send a request when the chat window is opened

messagesRouter.get(
  "/:friendshipId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { actualUser, targetUser } = req.body;
    const foundTargetUser = User.findById(targetUser);

    if (!foundTargetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const messages = await Message.find({
        $or: [
          { senderId: actualUser, receiverId: foundTargetUser },
          { senderId: foundTargetUser, receiverId: actualUser },
        ],
      });

      await Message.updateMany(
        {
          receiverId: actualUser,
          senderId: targetUser,
          isRead: false,
        },
        { $set: { isRead: true } }
      );

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
);

export default messagesRouter;
