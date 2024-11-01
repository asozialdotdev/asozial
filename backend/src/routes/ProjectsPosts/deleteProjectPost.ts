import { Request, Response, NextFunction } from "express";
import ProjectPost from "../../models/ProjectPost.models";
import ProjectPostReply from "../../models/ProjectPostReply.models";
import User from "../../models/User.models";

export const deleteProjectPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    await User.findOneAndUpdate(
      { _id: post.userId },
      { $pull: { "projects.dashboardPosts": post._id } }
    );

    await ProjectPost.findByIdAndDelete(req.params.projectPostId);

    res.status(200).json({ message: "Post deleted", post });
  } catch (error) {
    next(error);
  }
};
