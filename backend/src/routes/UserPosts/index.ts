import express from "express";
import { createUserPost } from "./createUserPost";
import { getAllUserPosts } from "./getAllUserPosts";
import { getFriendsPosts } from "./getFriendsPosts";
import { deleteUserPost } from "./deleteUserPost";

const usersPostRouter = express.Router();

usersPostRouter.post("/", createUserPost);
usersPostRouter.get("/", getAllUserPosts);
usersPostRouter.get("/friends", getFriendsPosts);
usersPostRouter.delete("/:userPostId", deleteUserPost);

export default usersPostRouter;
