import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const updateUserLanguagesAndGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, codingLanguages, github } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        codingLanguages,
        github,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
