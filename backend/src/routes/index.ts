import express, { Request, Response } from "express";

const dashboardRouter = express.Router();

dashboardRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

export default dashboardRouter;
