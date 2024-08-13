import config from "./config";
import express, { Request, Response } from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
config(app);
app.use(cookieParser());
app.use(cors());

app.use("/dashboard", isAuthenticated, dashboardRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use("/api/projects", isAuthenticated, projectsRouter);
app.use("/api/posts", isAuthenticated, postRouter);
app.use("/auth", githubRouter);
app.use(["/verify", "/account"], isAuthenticated, accountRouter);

export default app;
