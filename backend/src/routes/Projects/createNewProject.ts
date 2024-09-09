import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";
import User from "../../models/User.models";

export const createNewProject = async (
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
      mainLanguage,
      githubRepo,
      socials,
      image,
      placeholder,
      slug,
      userId,
    } = req.body;

    const newProject = await Project.create({
      title,
      description,
      pitch,
      techStack,
      mainLanguage,
      githubRepo,
      image,
      placeholder,
      socials,
      slug,
      owner: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { "projects.projectsOwned": newProject._id },
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};
