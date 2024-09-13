import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";
import ProjectPostReply from "../../models/ProjectPostReply.models";

export const getProjectPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
