import { Request, Response, NextFunction } from "express";
import Friendship from "../../models/Friendship.models";
import UserPost from "../../models/UserPost.models";

export const getFriendsPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    // Get all friendships where the user is either sender or receiver
    const friendships = await Friendship.find({
      $or: [
        { senderId: userId, status: "accepted" },
        { receiverId: userId, status: "accepted" },
      ],
    });

    // Extract friend IDs
    const friendIds = friendships.map((friendship) =>
      friendship.senderId.equals(userId)
        ? friendship.receiverId
        : friendship.senderId
    );

    // Get all posts made by friends
    const friendsPosts = await UserPost.find({
      userId: { $in: friendIds },
    }).populate("userId");

    res.json(friendsPosts);
  } catch (error) {
    next(error);
  }
};
