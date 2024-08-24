import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../models/Project.models";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";
import User from "../models/User.models";
import { generateSlug } from "../utils";

const projectsRouter = express.Router();

dotenv.config();

// GET search for projects
projectsRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, page = 1, limit = 12 } = req.query;
      console.log("Query", query);

      const searchQuery = query
        ? {
            title: { $regex: query, $options: "i" }, // Case-insensitive search
          }
        : {};

      const projects = await Project.find(searchQuery)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .populate("membersJoined", "username name image")
        .populate("owner", "username name image")
        .exec();
      console.log("Number of Projects Found:", projects.length);

      const totalProjects = await Project.countDocuments(searchQuery);
      console.log("Total Projects Found:", totalProjects);

      res.json({
        projects,
        totalPages: Math.ceil(totalProjects / +limit),
        currentPage: +page,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET all projects from a user (my projects)

projectsRouter.get(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, page = 1, limit = 12 } = req.query;

    try {
      // Ensure page and limit are numbers
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 12;

      // Find projects owned by the user with pagination
      const projects = await Project.find({ owner: userId })
        .populate("membersJoined", "username name image")
        .populate("owner", "username name image")
        .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
        .limit(limitNumber) // Limit to `limitNumber` documents
        .exec();

      // Get the total count of projects owned by the user
      const totalProjects = await Project.countDocuments({ owner: userId });

      console.log("Number of Projects Found:", projects.length);

      // Respond with projects and pagination details
      res.json({
        projects,
        totalPages: Math.ceil(totalProjects / limitNumber),
        currentPage: pageNumber,
      });
    } catch (error: any) {
      console.log("Error:", error.message);
      res
        .status(500)
        .json({ message: "An error occurred while fetching projects." });
    }
  }
);

// GET search for projects from a user (my-projects)

projectsRouter.get(
  "/user/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, page = 1, limit = 12 } = req.query;

      // Ensure page and limit are numbers
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 12;

      console.log("Query", query);
      console.log("Page", pageNumber);
      console.log("Limit", limitNumber);

      // Search query with pagination
      const searchQuery = query
        ? {
            title: { $regex: query, $options: "i" },
          }
        : {};

      const projects = await Project.find(searchQuery)
        .populate("membersJoined", "username name image")
        .populate("owner", "username name image")
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .exec();

      const totalProjects = await Project.countDocuments(searchQuery);

      res.json({
        projects,
        totalPages: Math.ceil(totalProjects / limitNumber),
        currentPage: pageNumber,
      });
    } catch (error) {
      next(error);
    }
  }
);

//GET check if project title is unique

projectsRouter.get(
  "/check-title",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, userId } = req.query;
    console.log("Title", title, "User ID", userId);
    try {
      const existingProject = await Project.findOne({ title, owner: userId });
      res.json({ isUnique: !existingProject });
    } catch (error) {
      next(error);
    }
  }
);

// POST to create a new project

projectsRouter.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
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
      console.log("githubRepo:::::::::::::", githubRepo);

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

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to create a project from Github

projectsRouter.post(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Body in Github function", req.body);
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

      const owner = await User.findOne({ _id: userId });
      if (!owner) {
        return res.status(404).json({ error: "User not found" });
      }
      const repoInfo = await axios.get(repoUrl);
      console.log("Repo Info", repoInfo);

      if (repoInfo.status !== 200) {
        return res
          .status(repoInfo.status)
          .json({ error: "Failed to fetch repository information" });
      }

      const { name, description, html_url, language } = repoInfo.data;
      const slug = generateSlug(name);

      const createProject = await Project.create({
        title: name,
        description: description,
        githubRepo: html_url,
        techStack: [language],
        owner: userId,
        status: "active",
        slug,
      });

      res.status(201).json(createProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET project by ID (detailed information)

projectsRouter.get(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId)
        .populate("membersJoined", "name username image")
        .populate("owner", "name username image")
        .exec();
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

projectsRouter.get(
  "/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Slug>>>>>>>>>>>>>", req.params.slug);
    try {
      const project = await Project.findOne({ slug: req.params.slug })
        .populate("membersJoined", "name username image")
        .populate("owner", "name username image")
        .exec();
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to join a project
// Change from from users to join to test
projectsRouter.post(
  ///:projectId/users,
  "/:projectId/join",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (
        project.membersJoined.includes(userId) ||
        project.membersApplied.includes(userId)
      ) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      // project.membersApplied.push(userId);
      project.membersJoined.push(userId); // Change from membersApplied to membersJoined to test
      await project.save();

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// GET check if user is a member of a project

projectsRouter.get(
  "/:projectId/is-member",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const { userId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        isMember: project.membersJoined.includes(user._id),
      });
    } catch (error) {
      next(error);
    }
  }
);

//PUT request to update a project

projectsRouter.put(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
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

      //if projectId, do api call to github to get repo info from backend

      console.log("githubRepo:::::::::::::", githubRepo);

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
  }
);

//PATCH to update pitch
projectsRouter.patch(
  "/:projectId/pitch",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// PATCH to update main language

projectsRouter.patch(
  "/:projectId/main-language",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mainLanguage, userId } = req.body;

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
        { mainLanguage },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to get project (tinderlike)

projectsRouter.get(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;

      const filteredProjects = await Project.aggregate([
        {
          $match: {
            $and: [
              { _id: { $nin: actualUser.avoidedProjects } },
              { _id: { $nin: actualUser.joinedProjects } },
              { _id: { $nin: actualUser.appliedProjects } },
              { mainLanguage: { $in: actualUser.languagesSpoken } },
            ],
          },
        },
        {
          $addFields: {
            techStackMatches: {
              $size: {
                $setIntersection: ["$techStack", actualUser.techStack],
              },
            },
          },
        },
        {
          $sort: { techStackMatches: -1 },
        },
      ]);
      res.status(200).json(filteredProjects);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to match project (tinderlike)

projectsRouter.post(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;
      const { projectId } = req.body;
      const foundProject = await Project.findById(projectId);

      if (!foundProject) {
        res.status(404).json({ error: "Project not found" });
        console.error("Project not found");
        return;
      }

      actualUser.projectsApplied.push(foundProject);
      await actualUser.save();

      foundProject.membersApplied.push(actualUser._id);
      await foundProject.save();

      const populatedActualUser = await User.findById(actualUser._id).populate(
        "projectsApplied"
      );

      const populatedFoundProject = await Project.findById(
        foundProject._id
      ).populate("membersApplied");

      res.status(200).json({
        message: "User have matched with a Project",
        actualUser: populatedActualUser,
        foundProject: populatedFoundProject,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE Project

// Delete a project and associated posts and replies
projectsRouter.delete("/:projectId", async (req, res) => {
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

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      message:
        "Project and all associated posts and replies deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project." });
  }
});

export default projectsRouter;
