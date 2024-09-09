import { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../../models/Project.models";
import User from "../../models/User.models";
import { generateSlug } from "../../utils";

export const createProjectFromGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { repoUrl, userId } = req.body;

    if (!repoUrl) {
      return res
        .status(400)
        .json({ error: "repoUrl query parameter is required" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId query parameter is required" });
    }

    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    const repoInfo: any = await axios.get(repoUrl);
    if (repoInfo.status !== 200) {
      return res
        .status(repoInfo.status)
        .json({ error: "Failed to fetch repository information" });
    }

    // if (owner?.github?.id !== repoInfo.data.owner?.id) {
    //   return res
    //     .status(403)
    //     .json({ error: "User is not the owner of this repository" });
    // }

    const { name, description, html_url, language } = repoInfo.data;
    const slug = generateSlug(name);

    const sanitizedDescription = description === null ? "" : description;
    const sanitizedLanguage = language === null ? "Other" : language;

    const createProject = await Project.create({
      title: name,
      description: sanitizedDescription,
      githubRepo: html_url,
      pitch: "",
      techStack: [sanitizedLanguage],
      owner: userId,
      status: "active",
      slug,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { "projects.projectsOwned": createProject._id },
    });

    res.status(201).json(createProject);
  } catch (error) {
    next(error);
  }
};
