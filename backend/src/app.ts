import config from "./config";
import express from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";

const app = express();
config(app);

app.use("/dashboard", dashboardRouter);

app.use("/users", usersRouter);

app.use("/projects", projectsRouter);

app.use("/posts", postRouter);

app.use("/auth", githubRouter);

export default app;
