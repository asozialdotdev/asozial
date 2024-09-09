import { Request, Response, NextFunction } from "express";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
