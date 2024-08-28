import express, { Request, Response, NextFunction } from "express";
import fileUploader from "../config/cloudinary.config";
import User from "../models/User.models";

const fileRouter = express.Router();

fileRouter.post(
  "/upload-image",
  fileUploader.single("imageUrl"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      res.status(200).json({
        message: "File uploaded successfully",
        url: req.file.path,
      });
    } catch (error: any) {
      console.error("Upload error:", error);

      res
        .status(500)
        .json({ error: error.message || "An unknown error occurred" });
    }
  }
);

fileRouter.put(
  "/upload-image",
  fileUploader.single("imageUrl"),
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export default fileRouter;
