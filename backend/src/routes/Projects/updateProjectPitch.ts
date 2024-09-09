import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const updateProjectPitch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pitch, userId } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      { pitch },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};
