import express, { Request, Response, NextFunction } from "express";
import fileUploader from "../config/cloudinary.config";

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

      console.log("this is the link of the image", req.file.path);
    } catch (error: any) {
      console.error("Upload error:", error);

      res
        .status(500)
        .json({ error: error.message || "An unknown error occurred" });
    }
  }
);

export default fileRouter;
