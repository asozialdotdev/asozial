import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import { verifyJWT } from "../middleware/jwt.middleware";

const accountRouter = express.Router();

accountRouter.get("/", async (req: Request, res: Response) => {
  const actualUser = (req as any).payload.user;
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    res.status(401).send("Unauthorized");
    return;
  }
  console.log(res);
  return res.status(200).send("Authorized");
});

export default accountRouter;
