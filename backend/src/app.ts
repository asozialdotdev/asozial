import config from "./config";
import express, { Request, Response } from "express";
import "./db";

import cookieParser from "cookie-parser";
import cors from "cors";

import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import friendshipsRouter from "./routes/Friendships.routes";
import userPostsRouter from "./routes/UserPosts.routes";

import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);
app.use(cookieParser());
app.use(cors());

app.use("/dashboard", isAuthenticated, dashboardRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/posts", postRouter);
app.use("/auth", githubRouter);
app.use("/api/friends", friendshipsRouter);
app.use("/api/user-posts", userPostsRouter);
app.use(["/verify", "/account"], isAuthenticated, accountRouter);

accountRouter.get(
  "/account",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.send(req.body);
  }
);

export default app;
