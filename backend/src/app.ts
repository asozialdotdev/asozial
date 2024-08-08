import config from "./config";
import express from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";

const app = express();
config(app);

app.use("/dashboard", dashboardRouter);

app.use("/users", usersRouter);

app.use("/projects", projectsRouter);

export default app;
