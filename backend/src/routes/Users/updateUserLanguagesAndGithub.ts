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

    console.log(_id, codingLanguages, github);

    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //   console.log("Invalid user ID");
    //   return res.status(400).json({ error: "Invalid user ID" });
    // }

    // if (!Array.isArray(codingLanguages)) {
    //   console.log("Invalid coding languages");
    //   return res.status(400).json({ error: "Invalid input data" });
    // }

    // if (typeof github !== "string") {
    //   console.log("Invalid github");
    //   return res.status(400).json({ error: "Invalid input data" });
    // }

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
