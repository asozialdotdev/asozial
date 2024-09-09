import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import ProjectPost from "../../models/ProjectPost.models";
import ProjectPostReply from "../../models/ProjectPostReply.models";
import User from "../../models/User.models";

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (userId !== project.owner._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this project" });
    }

    const posts = await ProjectPost.find({ projectId });

    for (const post of posts) {
      await ProjectPostReply.deleteMany({ projectPostId: post._id });
    }

    await ProjectPost.deleteMany({ projectId });

    await User.findOneAndUpdate(
      { _id: project.owner._id },
      { $pull: { "projects.projectsOwned": project._id } }
    );

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      message:
        "Project and all associated posts and replies deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project." });
  }
};
