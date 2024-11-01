import express from "express";
import { getAllUsers } from "./getAllUsers";
import { getAllProjects } from "./getAllProjects";

const searchRouter = express.Router();

searchRouter.get("/users", getAllUsers);
searchRouter.get("/projects", getAllProjects);

export default searchRouter;
