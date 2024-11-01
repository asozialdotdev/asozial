import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../../models/User.models";

export const updateUserLanguagesAndGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, codingLanguages, github } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!Array.isArray(codingLanguages) || typeof github !== 'string') {
      return res.status(400).json({ error: "Invalid input data" });
    }

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
