import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../models/Project.models";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";
import User from "../models/User.models";

const projectsRouter = express.Router();

dotenv.config();

// GET all my projects

projectsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    try {
      const projects = await Project.find({ owner: userId })
        .populate("membersJoined", "username name image")
        .populate("owner", "username name image")
        .exec();
      console.log("Number of Projects Found:", projects.length);
      res.json(projects);
    } catch (error: any) {
      console.log("Error:", error.message);
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
        owner: userId,
        socials,
      });

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to create a project after retrieving information from github repo

projectsRouter.get(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repoUrl = req.query.repoUrl as string;
      const ownerId = repoUrl.split("/")[0];
      console.log("Request Query", req.query.repoUrl);

      if (!repoUrl) {
        return res
          .status(400)
          .json({ error: "repoUrl query parameter is required" });
      }
      if (!ownerId) {
        return res
          .status(400)
          .json({ error: "ownerId query parameter is required" });
      }

      const repoInfo = await axios.get(
        `https://api.github.com/repos/${repoUrl}`
      );
      if (repoInfo.status !== 200) {
        return res
          .status(repoInfo.status)
          .json({ error: "Failed to fetch repository information" });
      }

      const owner = await User.findOne({ username: ownerId });
      if (!owner) {
        return res.status(404).json({ error: "User not found" });
      }

      const { name, description, html_url, language } = repoInfo.data;

      const createProject = await Project.create({
        title: name,
        description: description,
        githubRepo: html_url,
        techStack: [language],
        owner: owner._id,
        membersApplied: [],
        membersInvited: [],
        membersJoined: [],
        status: "active",
        posts: [],
      });

      res.status(201).json(createProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET search for my-projects

projectsRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.query;
      console.log("Query", query);

      const projects = await Project.find({
        title: { $regex: query, $options: "i" },
      })
        .populate("membersJoined", "username name image")
        .exec();

      res.json(projects);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 project (detailed information)

projectsRouter.get(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId)
        .populate("membersJoined", "name image")
        .populate("owner", "name image")
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
        userId,
      } = req.body;

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
        },
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
