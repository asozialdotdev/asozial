import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, page = 1, limit = 12 } = req.query;

  try {
    const searchQuery = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { techStack: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const projects = await Project.find(searchQuery)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate("members.membersJoined", "info.username info.name info.image")
      .populate("owner", "info.username info.name info.image")
      .exec();
    const totalProjects = await Project.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalProjects / +limit);
    res.json({
      projects,
      totalPages,
      currentPage: +page,
    });
  } catch (error) {
    next(error);
  }
};
