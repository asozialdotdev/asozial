import { Request, Response, NextFunction } from "express";
import Project from "../../models/Project.models";

export const getAppliedMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "userId query parameter is required" });
  }

  try {
    // Find all projects owned by the user where there are members in the `membersApplied` array
    const membersApplied = await Project.find({
      owner: userId,
      "members.membersApplied": { $exists: true, $ne: [] }, // Only get membersApplied with members applied
    })
      .select("_id slug title owner members.membersApplied")
      .populate("members.membersApplied", "info.username info.name info.image")
      .populate("owner", "info.username")
      .exec();
    res.json(membersApplied);
  } catch (error) {
    next(error);
  }
};
