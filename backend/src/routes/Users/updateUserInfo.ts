import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, website, company, location, email, bio } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "info.website": website,
        "info.company": company,
        "info.location": location,
        "info.email": email,
        "github.bio": bio,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
