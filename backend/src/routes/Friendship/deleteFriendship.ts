import { Request, Response, NextFunction } from "express";
import Friendship from "../../models/Friendship.models";

export const deleteFriendship = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { actualUser } = req.body;
    const deleteFriendship = await Friendship.findOneAndDelete({
      $or: [{ senderId: actualUser }, { receiverId: actualUser }],
      status: "accepted",
    });
    if (!deleteFriendship) {
      res.status(404).send("Friendship not found or unauthorized");
      console.error("Friendship not found or unauthorized");
      return;
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
};
