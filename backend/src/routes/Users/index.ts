import express from "express";
import { searchUsers } from "./searchUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getUserById } from "./getUserById";
import { getAccountInfo } from "./getAccountInfo";
import { updateUserInfo } from "./updateUserInfo";
import { updateUserLanguagesAndGithub } from "./updateUserLanguagesAndGithub";

const usersRouter = express.Router();

usersRouter.get("/search", searchUsers);
usersRouter.get("/:username", getUserByUsername);
usersRouter.get("/:userId", getUserById);
usersRouter.get("/account", getAccountInfo);
usersRouter.put("/", updateUserInfo);
usersRouter.put("/update", updateUserLanguagesAndGithub);

export default usersRouter;
