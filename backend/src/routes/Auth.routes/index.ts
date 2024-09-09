import express, { Request, Response } from "express";
import User from "../../models/User.models";

const githubRouter = express.Router();

githubRouter.get("/", (req: Request, res: Response) => {
  try {
    if (!process.env.GITHUB_CLIENT_ID) {
      throw new Error("GITHUB_CLIENT_ID is not defined");
    } else if (!process.env.GITHUB_REDIRECT_URI) {
      throw new Error("GITHUB_REDIRECT_URI is not defined");
    } else {
      const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`;
      req.headers["Content-Type"] = "application/json";
      req.headers["AccessControlAllowHeaders"] = "*";
      req.headers["AccessControlAllowOrigin"] = "*";
      res.redirect(githubAuthURL);
    }
  } catch (error: any) {
    console.error("/GET auth middleware:", error.message);
    res.status(500).json("Server error");
  }
});

// POST Create new user

githubRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

export default githubRouter;
