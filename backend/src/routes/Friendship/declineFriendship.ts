import { Request, Response, NextFunction } from "express";
import Friendship from "../../models/Friendship.models";
import User from "../../models/User.models";

export const declineFriendship = async (
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
      { status: "declined" },
      { new: true }
    );

    if (!friendship) {
      res
        .status(404)
        .send(
          "Friendship not found or you are not authorized to decline this request."
        );
      console.error("Friendship not found or unauthorized attempt to decline.");
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
};
