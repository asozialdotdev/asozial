import config from "./config";
import express from "express";
import "./db";

import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import projectPostRouter from "./routes/ProjectPosts.routes";
import projectPostReplyRouter from "./routes/ProjectPostReply.routes";
import githubRouter from "./routes/Auth.routes";
import friendshipsRouter from "./routes/Friendships.routes";
import userPostsRouter from "./routes/UserPosts.routes";
import messagesRouter from "./routes/Messages.routes";
import fileRouter from "./routes/FileUploader.routes";
import searchRouter from "./routes/Search.router";
import matchRouter from "./routes/Match.routes";

const app = express();
config(app);

app.use("/api/auth", githubRouter);
app.use("/dashboard", dashboardRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/project-posts", projectPostRouter);
app.use("/api/replies", projectPostReplyRouter);
app.use("/api/user-posts", userPostsRouter);
app.use("/api/friends", friendshipsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/match", matchRouter);
app.use("/api", fileRouter);
app.use("/search", searchRouter);

export default app;
