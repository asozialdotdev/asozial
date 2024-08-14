import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import { verifyJWT } from "../middleware/jwt.middleware";

const verifyRouter = express.Router();

verifyRouter.get("/", (req: Request, res: Response) => {
  const actualUser = (req as any).payload.user;
  const accessToken = req.headers.authorization?.split(" ")[1];
  console.log("this is the access token", accessToken);
  if (!accessToken) {
    res.status(401).send("Unauthorized");
    return;
  }
  const decoded = verifyJWT(accessToken);
  console.log("this is the decoded", decoded);
  if (!decoded) {
    res.status(401).send("Unauthorized");
    return;
  }
  res.status(200).send(decoded);
});

export default verifyRouter;
