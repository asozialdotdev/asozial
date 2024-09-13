import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  } catch (error) {
    next(error);
  }
};
