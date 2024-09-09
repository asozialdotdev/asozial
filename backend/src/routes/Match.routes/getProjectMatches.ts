import { Request, Response, NextFunction } from "express";
import User from "../../models/User.models";
import Project from "../../models/Project.models";

export const getProjectMatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { actualUser, targetProject } = req.body;

    const user = await User.findById(actualUser);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isProjectAlreadyMatched =
      user.matches?.projects?.suggested.includes(targetProject) ||
      user.matches?.projects?.pending.includes(targetProject) ||
      user.matches?.projects?.accepted.includes(targetProject) ||
      user.matches?.projects?.declined.includes(targetProject);

    if (isProjectAlreadyMatched) {
      return res.status(200).json({
        message: "Project already matched or suggested to the user.",
      });
    }

    const filteredProjects = await Project.aggregate([
      {
        $match: {
          _id: {
            $nin: user.matches?.projects?.suggested.concat(
              user.matches?.projects?.pending,
              user.matches?.projects?.accepted,
              user.matches?.projects?.declined
            ),
          },
          mainLanguage: { $in: user.skills?.languagesSpoken },
        },
      },
      {
        $addFields: {
          techStackMatches: {
            $size: {
              $setIntersection: [
                "$techStack",
                user.skills?.codingLanguages.map((cl: any) => cl.language),
              ],
            },
          },
        },
      },
      {
        $sort: { techStackMatches: -1 },
      },
    ]);

    user.matches?.projects?.suggested.push(targetProject);
    await user.save();

    res.status(200).json({
      message: "Project matched successfully",
      suggestedProjects: filteredProjects,
    });
  } catch (error) {
    console.error("Error fetching matched projects:", error);
    next(error);
  }
};
