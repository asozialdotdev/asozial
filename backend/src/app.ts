import config from "./config";
import express from "express";
import "./db";

import cookieParser from "cookie-parser";
import cors from "cors";

import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import verifyRouter from "./routes/Verify.routes";
import friendshipsRouter from "./routes/Friendships.routes";
import userPostsRouter from "./routes/UserPosts.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);

app.use("/auth", githubRouter);
app.use("/dashboard", isAuthenticated, dashboardRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use("/api/projects", isAuthenticated, projectsRouter);
app.use("/api/posts", isAuthenticated, postRouter);
app.use("/account", isAuthenticated, accountRouter);
app.use("/verify", isAuthenticated, verifyRouter);
app.use("/api/user-posts", userPostsRouter);
app.use("/api/friends", friendshipsRouter);

export default app;