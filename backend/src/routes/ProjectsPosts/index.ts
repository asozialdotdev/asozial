import express from "express";
import { getProjectPosts } from "./getProjectPosts";
import { createProjectPost } from "./createProjectPost";
import { getProjectPostById } from "./getProjectPostById";
import { createProjectPostReply } from "./createProjectPostReply";
import { toggleLikeOnProjectPost } from "./toggleLikeOnProjectPost";
import { toggleDislikeOnProjectPost } from "./toggleDislikeOnProjectPost";
import { updateProjectPost } from "./updateProjectPost";
import { deleteProjectPost } from "./deleteProjectPost";

const projectPostRouter = express.Router();

projectPostRouter.get("/", getProjectPosts);
projectPostRouter.post("/", createProjectPost);
projectPostRouter.get("/:projectPostId", getProjectPostById);
projectPostRouter.post("/reply", createProjectPostReply);
projectPostRouter.post("/:projectPostId/like", toggleLikeOnProjectPost);
projectPostRouter.post("/:projectPostId/dislike", toggleDislikeOnProjectPost);
projectPostRouter.put("/:projectPostId", updateProjectPost);
projectPostRouter.delete("/:projectPostId", deleteProjectPost);

export default projectPostRouter;
