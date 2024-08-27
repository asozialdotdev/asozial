import express, { Request, Response } from "express";

const dashboardRouter = express.Router();

dashboardRouter.get("/", (req: Request, res: Response) => {
  // const { _id, username, image } = (req as any).payload;
  res.send("Hello, TypeScript Express!");
});

export default dashboardRouter;
