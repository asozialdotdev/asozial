import express, { Request, Response, NextFunction } from "express";
import Post from "../models/Post.models";
import Project from "../models/Project.models";

const postRouter = express.Router();

// postRouter.post(
//   "/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const newPost = Post.create({
//         userId: req.body.userId,
//         title: req.body.title,
//         content: req.body.content,
//       });
//       res.status(201).json(newPost);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

postRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("GET /api/posts called");
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const posts = await Post.find({ projectId });
    console.log("Fetched posts:", posts);

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST /api/posts called");
    try {
      const { title, content, projectId, userId, parentPostId } = req.body;
      console.log("projectIDDDDDD", projectId, title);

      //NOT WORKING TO GET USER ID
      // const userId = (req as any).user;
      // console.log("userIdd", userId)

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
      });

      // If the post is a reply, add it to the parent post's replies array
      if (parentPostId) {
        const parentPost = await Post.findById(parentPostId);
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

export default postRouter;
