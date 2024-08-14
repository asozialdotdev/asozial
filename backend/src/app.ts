import config from "./config";
import express from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import accountRouter from "./routes/Account.routes";
import verifyRouter from "./routes/Verify.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);

//app.use("/dashboard", isAuthenticated, dashboardRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use("/api/projects", isAuthenticated, projectsRouter);
app.use("/api/posts", isAuthenticated, postRouter);
app.use("/account", isAuthenticated, accountRouter);
app.use("/verify", isAuthenticated, verifyRouter);
app.use("/auth", githubRouter);

export default app;
