import config from "./config";
import express from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);

app.use("/dashboard", isAuthenticated, dashboardRouter);

app.use("/users", usersRouter);

app.use("/api/projects", projectsRouter);

app.use("/posts", postRouter);

app.use("/auth", githubRouter);

export default app;
