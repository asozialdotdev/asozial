import config from "./config";
import express, { Request, Response } from "express";
import "./db";
import dashboardRouter from "./routes/index";
import usersRouter from "./routes/Users.routes";
import projectsRouter from "./routes/Projects.routes";
import postRouter from "./routes/Post.routes";
import githubRouter from "./routes/Auth.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";

const app = express();
config(app);
const accountRouter = express.Router();

app.use("/dashboard", dashboardRouter);

app.use("/users", isAuthenticated, usersRouter);

app.use("/projects", isAuthenticated, projectsRouter);

app.use("/posts", postRouter);

app.use("/auth", githubRouter);

accountRouter.get(
  "/account",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.send(req.body);
  }
);

export default app;
