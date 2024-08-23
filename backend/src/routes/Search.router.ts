import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Project from "../models/Project.models";

const searchRouter = express.Router();

dotenv.config();

searchRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      next(error);
    }
  }
);

searchRouter.get(
  "/projects",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProjects = await Project.find();
      res.json(allProjects);
    } catch (error) {
      next(error);
    }
  }
);

export default searchRouter;
