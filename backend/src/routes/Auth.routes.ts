import express, { Request, Response } from "express";
import axios from "axios";
import { generateJWT } from "../middleware/jwt.middleware";
import User from "../models/User.models";

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

// githubRouter.post("/", async (req: Request, res: Response) => {
//   const { code } = req.body;

//   if (!code) {
//     res.status(404).json("code not found");
//   } else {
//     try {
//       const getGithubAccessToken = await axios.post(
//         "https://github.com/login/oauth/access_token",
//         {
//           code,
//           client_id: process.env.GITHUB_CLIENT_ID,
//           client_secret: process.env.GITHUB_CLIENT_SECRET,
//           redirect_uri: process.env.GITHUB_REDIRECT_URI,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             AccessControlAllowHeaders: "*",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const githubAccessToken = getGithubAccessToken.data.access_token;
//       if (!githubAccessToken) return;

//       const getUserInfo = await axios.get("https://api.github.com/user", {
//         headers: {
//           Authorization: `Bearer ${githubAccessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const { login, id, image, name } = getUserInfo.data;
//       const user =
//         (await User.findOne({ githubID: id })) ||
//         (await User.create({
//           username: login,
//           githubID: id,
//           image: image,
//           name: name,
//         }));
//       const { _id, username, image, email } = user;
//       const payload = {
//         _id: _id.toString(),
//         username,
//         image,
//         email,
//       };
//       //post payload to nextjs server and it handles the token generation
//       //       const refreshToken = generateJWT(payload, { refresh: true });
//       // const accessToken = generateJWT(payload, { refresh: false });
//       console.log("Payload:", payload);
//       const sendUserToNext = await axios.post(
//         "http://localhost:3000/api/verify",

//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       res.status(200).json(payload);
//       console.log(res.statusMessage, res.statusCode);
//     } catch (error: any) {
//       // @ts-ignore: Unreachable code error
//       console.log("/POST auth middleware:", error.message);
//       res.status(500).json("Server error");
//     }
//   }
// });

// POST Create new user

githubRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

export default githubRouter;
