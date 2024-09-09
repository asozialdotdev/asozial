import express from "express";
import { getUserMatches } from "./getUserMatches";
import { createUserMatch } from "./createUserMatch";
import { acceptUserMatch } from "./acceptUserMatch";
import { declineUserMatch } from "./declineUserMatch";
import { getProjectMatches } from "./getProjectMatches";
import { createProjectMatch } from "./createProjectMatch";
import { acceptProjectMatch } from "./acceptProjectMatch";
import { declineProjectMatch } from "./declineProjectMatch";

const matchRouter = express.Router();

// ------------- USER ------------- //

matchRouter.get("/users", getUserMatches);
matchRouter.post("/users", createUserMatch);
matchRouter.put("/users/accept", acceptUserMatch);
matchRouter.put("/users/decline", declineUserMatch);

// ------------- PROJECT ------------- //

matchRouter.get("/projects", getProjectMatches);
matchRouter.post("/projects", createProjectMatch);
matchRouter.put("/projects/accept", acceptProjectMatch);
matchRouter.put("/projects/decline", declineProjectMatch);

export default matchRouter;
