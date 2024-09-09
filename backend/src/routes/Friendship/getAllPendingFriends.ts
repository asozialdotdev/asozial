import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const getAllPendingFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { actualUser } = req.query;

    const user = await User.findById(actualUser)
      .populate({
        path: "friends.pending", // Populate the 'friends.pending' array
        select: "info.username info.image", // Select only username and image fields
      })
      .exec();

    if (!user) {
      console.error("No user found");
      return res.status(404).send("No user found");
    }

    res.json(user.friends?.pending || []); // Return the pending friends or an empty array if none
  } catch (error) {
    console.error("Error fetching pending friendships:", error);
    next(error);
  }
};
