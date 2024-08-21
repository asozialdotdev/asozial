import config from "./config";
import express from "express";
import "./db";

import cookieParser from "cookie-parser";
import cors from "cors";

import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import projectPostRouter from "./routes/ProjectPosts.routes";
import projectPostReplyRouter from "./routes/ProjectPostReply.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import verifyRouter from "./routes/Verify.routes";
import friendshipsRouter from "./routes/Friendships.routes";
import userPostsRouter from "./routes/UserPosts.routes";
import messagesRouter from "./routes/Messages.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);

app.use("/api/auth", githubRouter);
app.use("/account", accountRouter);
app.use("/verify", verifyRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/project-posts", projectPostRouter);
app.use("/api/replies", projectPostReplyRouter);
app.use("/api/user-posts", userPostsRouter);
app.use("/api/friends", friendshipsRouter);
app.use("/api/messages", messagesRouter);

export default app;
