import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const getAllDeclinedFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { actualUser } = req.body;

    const user = await User.findById(actualUser).populate("friends.declined");

    if (!user || !user.friends?.declined.length) {
      res.status(404).send("You don't have any declined friendships!");
      console.error("No declined friendships found");
      return;
    }

    res.json(user.friends.declined);
  } catch (error) {
    next(error);
  }
};
