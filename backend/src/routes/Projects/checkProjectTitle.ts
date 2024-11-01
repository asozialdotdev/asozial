import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const checkProjectTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, userId } = req.query;
  try {
    const existingProject = await Project.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
      owner: userId,
    });

    res.json({ isUnique: !existingProject });
  } catch (error) {
    next(error);
  }
};
