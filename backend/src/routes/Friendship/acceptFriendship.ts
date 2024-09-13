import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Friendship from "../../models/Friendship.models";

export const acceptFriendship = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      console.error("Friendship not found or unauthorized attempt to accept.");
      return;
    }

    friendship.friends.push(userId, friendship.senderId);

    await friendship.save();

    await User.findByIdAndUpdate(friendship.senderId, {
      $pull: { "friends.pending": friendship.receiverId },
      $addToSet: { "friends.accepted": friendship.receiverId },
    });

    await User.findByIdAndUpdate(friendship.receiverId, {
      $pull: { "friends.pending": friendship.senderId },
      $addToSet: { "friends.accepted": friendship.senderId },
    });

    res.status(200).json(friendship);
  } catch (error) {
    console.error("Error accepting friendship:", error);
    next(error);
  }
};
