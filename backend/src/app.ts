import config from "./config";
import express, { Request, Response } from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import { isAuthenticated, verifyJWT } from "./middleware/jwt.middleware";

const app = express();
config(app);

app.use("/dashboard", dashboardRouter);

app.use("/users", isAuthenticated, usersRouter);

app.use("/projects", isAuthenticated, projectsRouter);

app.use("/posts", postRouter);

app.use("/auth", githubRouter);

app.use(["/verify", "/account"], isAuthenticated, accountRouter);

export default app;
