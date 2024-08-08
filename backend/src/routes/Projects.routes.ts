import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
/* import { Octokit } from "@octokit/core";
 */
import Project from "../models/Project.models";
const projectsRouter = express.Router();
dotenv.config();

/* 
const githubSecretToken = process.env.GITHUB_AUTHORIZATION_TOKEN;
const octokit = new Octokit({ auth: githubSecretToken });

const response = await octokit.request("GET /orgs/{org}/repos", {
  org: "octokit",
  type: "private",
});

projectsRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  const projectURL = ``;
});

*/
// GET 1 project

projectsRouter.get(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repoUrl = req.params.repoUrl;
      const repoInfo = await axios.get(
        `https://api.github.com/repos/${repoUrl}`
      );
      const { name, description, html_url, language, owner } = repoInfo.data;

      const createProject = await Project.create({
        title: name,
        description: description,
        githubRepo: html_url,
        techStack: [language],
        owner: owner.login,
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

// GET all projects

projectsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.find();
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

export default projectsRouter;
