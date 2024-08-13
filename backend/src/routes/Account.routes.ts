import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import { isAuthenticated, verifyJWT } from "../middleware/jwt.middleware";

const accountRouter = express.Router();

accountRouter.get("/account", (req: Request, res: Response) => {
  res.send(req.body);
});

accountRouter.get("/verify", (req: Request, res: Response) => {
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

export default accountRouter;
