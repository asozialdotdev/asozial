import express, { Request, Response, NextFunction } from "express";
import fileUploader from "../../config/cloudinary.config";
import { uploadImage } from "./uploadImage";
import { updateUserImage } from "./updateUserImage";

const fileRouter = express.Router();

fileRouter.post("/upload-image", fileUploader.single("imageUrl"), uploadImage);

fileRouter.put(
  "/upload-image",
  fileUploader.single("imageUrl"),
  updateUserImage
);

export default fileRouter;
