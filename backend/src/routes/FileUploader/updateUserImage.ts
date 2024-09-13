import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";

export const updateUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.body.userId,
      {
        image: req.file.path,
      },
      { new: true }
    );

    res.json(user);
  } catch (error: any) {
    console.error("Update image error:", error);

    res
      .status(500)
      .json({ error: error.message || "An unknown error occurred" });
  }
};
