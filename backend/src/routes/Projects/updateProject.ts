import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      pitch,
      techStack,
      githubRepo,
      mainLanguage,
      socials,
      status,
      image,
      slug,
      placeholder,
      userId,
    } = req.body;

    // Find the project first
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the current user is the owner of the project
    if (project.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        description,
        pitch,
        techStack,
        githubRepo,
        mainLanguage,
        socials,
        status,
        image,
        placeholder,
        slug,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};
