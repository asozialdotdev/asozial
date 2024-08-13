import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { generateJWT } from "../middleware/jwt.middleware";

import User from "../models/User.models";

const githubRouter = express.Router();

githubRouter.get("/", (req: Request, res: Response) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`;
  res.redirect(githubAuthURL);
});

githubRouter.post("/", async (req: Request, res: Response) => {
  const { code } = req.body;
  console.log(code);

  if (!code) {
    res.status(404).json("code not found");
    return;
  }

  try {
    const getGithubAccessToken = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      },
      {
        headers: {
          Accept: "application/json",
          AccessControlAllowHeaders: "*",
        },
      }
    );
    console.log(getGithubAccessToken.data);
    const githubAccessToken = getGithubAccessToken.data.access_token;
    console.log(githubAccessToken);
    if (!githubAccessToken) return;
    const getUserInfo = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    console.log("get user info =", getUserInfo);
    const { login, id, avatar_url, name } = getUserInfo.data;
    const foundUser = await User.findOne({ githubID: id });

    if (foundUser) {
      console.log("User found");
const { _id, username, avatarUrl, email } = foundUser;
      const payload = {
        _id: _id.toString(),
        username,
        avatarUrl,
        email,
      };
      console.log("Payload", payload);
      const refreshToken = generateJWT(payload, { refresh: true });
      console.log("Refresh Token in auth", refreshToken);
      const accessToken = generateJWT(payload, { refresh: false });
      console.log("Access Token in auth", accessToken);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .set("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", `Bearer ${accessToken}`)
        .json(payload);
      return;
    }
    console.log("User not found");
    const createdUser = await User.create({
      username: login,
      githubID: id,
      avatarUrl: avatar_url,
      name: name,
      email,
    });
    const { _id, username, avatarUrl, email } = createdUser;
    const payload = {
      _id: _id.toString(),
      username,
      avatarUrl,
      email,
    };
    const refreshToken = generateJWT(payload, { refresh: true });

    const accessToken = generateJWT(payload, { refresh: false });
    console.log("Access Token in auth", accessToken);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .set("Access-Control-Expose-Headers", "Authorization")
      .header("Authorization", `Bearer ${accessToken}`)
      .json(payload);
    console.log("User created");
    console.log(res.header);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
  console.log("End of the function");
});

export default githubRouter;
