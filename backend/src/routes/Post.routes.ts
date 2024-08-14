import express, { Request, Response, NextFunction } from "express";
import Post from "../models/Post.models";
import Project from "../models/Project.models";
import { isAuthenticated, verifyJWT } from "../middleware/jwt.middleware";

const postRouter = express.Router();

postRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("GET /api/posts called");
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    // Find parent posts and populate their replies
    const parentPosts = await Post.find({ projectId, parentId: null })
      .populate({
        path: "replies",
        populate: {
          path: "replies",
        },
      })
      .exec();

    console.log("Fetched posts:", parentPosts);

    res.status(200).json(parentPosts);
  } catch (error) {
    next(error);
  }
});

postRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST /api/posts called");
    try {
      // this must then replace the userId in the request body params
      // const userId = (req as any).payload.user;
      // console.log("userIdd", userId);

      const { title, content, projectId, userId, parentId } = req.body;
      console.log("projectIDDDDDD", projectId);

      // Ensure the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        console.log("error is here");
        return res.status(404).json({ message: "Project not found" });
      }

      // Create the new post
      const newPost = await Post.create({
        userId,
        title,
        content,
        projectId,
        parentId,
      });

      // If the post is a reply, add it to the parent post's replies arrayy
      if (parentId) {
        const parentPost = await Post.findById(parentId);
        if (!parentPost) {
          return res.status(404).json({ message: "Parent post not found" });
        }
        parentPost.replies.push(newPost._id);
        await parentPost.save();
      }

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 post
postRouter.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET /api/posts/:postId called");
    try {
      const post = await Post.findById(req.params.postId).populate("replies");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
