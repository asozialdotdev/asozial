import express, { Request, Response, NextFunction } from "express";
import Post from "../models/Post.models";

const postRouter = express.Router();

postRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPost = Post.create({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
