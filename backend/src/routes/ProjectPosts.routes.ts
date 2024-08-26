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

      const projectPosts = await ProjectPost.find({ projectId })
        .populate({
          path: "userId",
          select: "info.username info.name info.image",
        })
        .populate({
          path: "projectId",
          select: "slug",
        })
        .populate("replyCount");
      console.log("Projects with reply counts >>>>><<<<>>>><<<<", projectPosts);
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
      const { title, content, image, placeholder, projectId, userId } =
        req.body;
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
        image,
        placeholder,
        userId,
        projectId,
      });

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 project post by ID and its replies
projectPostRouter.get(
  "/:projectPostId",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET /api/posts/:postId called");
    try {
      const post = await ProjectPost.findById(req.params.projectPostId)
        .populate({
          path: "userId",
          select: "info.username info.name info.image",
        })
        .populate({
          path: "projectId",
          select: "slug",
        })
        .exec();

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      // Fetch the replies for this post
      const replies = await ProjectPostReply.find({
        projectPostId: req.params.projectPostId,
      })
        .populate({
          path: "userId",
          select: "info.username info.name info.image",
        })
        .populate({
          path: "children",
          populate: {
            path: "userId",
            select: "info.username info.name info.image",
          },
        })
        .exec();

      res.status(200).json({ post, replies });
    } catch (error) {
      next(error);
    }
  }
);

// POST Create a new reply to a project post
projectPostRouter.post(
  "/reply",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectPostId, userId, content, parentId } = req.body;

      if (!projectPostId || !userId || !content) {
        return res
          .status(400)
          .json({ message: "projectPostId, userId and content are required" });
      }

      const projectPost = await ProjectPost.findById(projectPostId);
      if (!projectPost) {
        return res.status(404).json({ message: "Project post not found" });
      }

      // Create the new reply
      const newReply = await ProjectPostReply.create({
        content,
        projectPostId,
        userId,
        parentId: parentId || null,
      });

      // If it's a nested reply parentId !== null, add it to the parent's children array
      if (parentId) {
        await ProjectPostReply.findByIdAndUpdate(parentId, {
          $push: { children: newReply._id },
        });
      }

      res.status(201).json(newReply);
    } catch (error) {
      next(error);
    }
  }
);

// POST Toggle Like projectPost
projectPostRouter.post("/:projectPostId/like", async (req, res, next) => {
  const { userId } = req.body;

  try {
    const post = await ProjectPost.findById(req.params.projectPostId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // no null values in the arrays
    post.likes = post.likes.filter((id) => id && id.toString() !== null);
    post.dislikes = post.dislikes.filter((id) => id && id.toString() !== null);

    // If user already liked the post, remove the like
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Otherwise, add the like
      post.likes.push(userId);

      // If the user had already disliked the post, remove the dislike
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (error) {
    console.error("Error liking post:", error);
    next(error);
  }
});

// POST Toggle Dislike a project post
projectPostRouter.post("/:projectPostId/dislike", async (req, res, next) => {
  const { userId } = req.body;

  try {
    const post = await ProjectPost.findById(req.params.projectPostId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    //  no null values in the arrays
    post.likes = post.likes.filter((id) => id && id.toString() !== null);
    post.dislikes = post.dislikes.filter((id) => id && id.toString() !== null);

    // If user already disliked the post, remove the dislike
    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    } else {
      // Otherwise, add the dislike
      post.dislikes.push(userId);

      // If the user had already liked the post, remove the like
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (error) {
    console.error("Error disliking post:", error);
    next(error);
  }
});

// PUT Update a project post
projectPostRouter.put("/:projectPostId", async (req, res, next) => {
  try {
    const { title, content, image, placeholder, edited, userId } = req.body;

    const post = await ProjectPost.findById(req.params.projectPostId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const udpatedPost = await ProjectPost.findByIdAndUpdate(
      req.params.projectPostId,
      { title, content, image, placeholder, edited },
      { new: true, runValidators: true }
    );

    res.status(200).json(udpatedPost);
  } catch (error) {
    next(error);
  }
});

//DELETE a post

projectPostRouter.delete("/:projectPostId", async (req, res, next) => {
  try {
    const { userId } = req.body;

    const post = await ProjectPost.findById(req.params.projectPostId).populate(
      "projectId",
      "slug"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await ProjectPostReply.deleteMany({
      projectPostId: req.params.projectPostId,
    });

    await ProjectPost.findByIdAndDelete(req.params.projectPostId);

    res.status(200).json({ message: "Post deleted", post });
  } catch (error) {
    next(error);
  }
});

export default projectPostRouter;
