import express, { Request, Response, NextFunction } from "express";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";
import Project from "../models/Project.models";

const projectPostRouter = express.Router();

// Get all projectPosts
projectPostRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("get all projectPosts called");
    try {
      const { projectId } = req.query;
      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }

      const projectPosts = await ProjectPost.find({ projectId });
      res.status(200).json(projectPosts);
    } catch (error) {
      next(error);
    }
  }
);

// Create a new Project Post

projectPostRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST /api/posts called");
    try {
      // this must then replace the userId in the request body params
      // const userId = (req as any).payload.user;
      // console.log("userIdd", userId);

      const { title, content, projectId, userId } = req.body;
      console.log("projectIDDDDDD", projectId);

      if (!title || !content || !projectId || !userId) {
        return res.status(400).json({
          message: "title, content, projectId and userId are required",
        });
      }

      // Ensure the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        console.log("error is here");
        return res.status(404).json({ message: "Project not found" });
      }

      // Create the new post
      const newPost = await ProjectPost.create({
        title,
        content,
        userId,
        projectId,
      });

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 project post by ID
projectPostRouter.get(
  "/:projectPostId",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET /api/posts/:postId called");
    try {
      const post = await ProjectPost.findById(
        req.params.projectPostId
      ).populate({
        path: "userId",
        select: "name avatarUrl",
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Fetch the replies for this post
      const replies = await ProjectPostReply.find({
        projectPostId: req.params.projectPostId,
      })
        .populate({
          path: "userId",
          select: "name avatarUrl",
        })
        .populate({
          path: "children",
          populate: {
            path: "userId",
            select: "name avatarUrl",
          },
        });

      res.status(200).json({ post, replies });
    } catch (error) {
      next(error);
    }
  }
);

export default projectPostRouter;