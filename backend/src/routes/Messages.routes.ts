import express, { Request, Response, NextFunction } from "express";
import Message from "../models/Message.models";
import User from "../models/User.models";

const messagesRouter = express.Router();

// POST request to create a new message

messagesRouter.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const actualUser = (req as any).payload.user;
    const targetUser = User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const newMessage = await Message.create({
        senderId: actualUser,
        receiverId: targetUser,
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
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const actualUser = (req as any).payload.user;
    const targetUser = User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const messages = await Message.find({
        $or: [
          { senderId: actualUser._id, receiverId: targetUser },
          { senderId: targetUser, receiverId: actualUser._id },
        ],
      });

      await Message.updateMany(
        {
          receiverId: actualUser._id,
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
