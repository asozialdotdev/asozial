import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../models/Project.models";
import User from "../models/User.models";
import { verifyJWT } from "../middleware/jwt.middleware";
import { ObjectId } from "mongodb";

interface JwtPayload {
  _id: string;
  username: string;
  // other properties if any
}

function isJwtPayload(payload: any): payload is JwtPayload {
  return (payload as JwtPayload)._id !== undefined;
}

const projectsRouter = express.Router();

dotenv.config();

// GET all my projects

projectsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // const actualUser = (req as any).payload.user;
    try {
      const projects = await Project.find({
        owner: "66ba4cb189ed3084ede59fa5",
      });
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
      const { title, description, pitch, techStack, mainLanguage, userId } =
        req.body;

      const newProject = await Project.create({
        title,
        description,
        pitch,
        techStack,
        mainLanguage,
        owner: userId,
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
      const actualUser = (req as any).payload.user;
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
      const actualUser = (req as any).payload.user;
      const { query } = req.query;
      console.log("Query", query);

      const projects = await Project.find({
        title: { $regex: query, $options: "i" }, // Case-insensitive search
      });

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
      const project = await Project.findById(req.params.projectId);
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

projectsRouter.post(
  "/:projectId/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const actualUser = (req as any).payload.user;
      if (
        project.membersJoined.includes(actualUser) ||
        project.membersApplied.includes(actualUser)
      ) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      project.membersApplied.push(actualUser._id);
      await project.save();

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// GET check if user is a member of a project

projectsRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const project = await Project.findById(req.query.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({
        isMember: project.membersJoined.includes(user._id),
      });
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

export default projectsRouter;
