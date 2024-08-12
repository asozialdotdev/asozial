import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

type State = {
  refresh?: boolean;
};

const generateJWT = (payload: JwtPayload, state: State) => {
  const { exp, iat, ...rest } = payload;
  return jwt.sign(rest, process.env.JWT_TOKEN_SECRET as string, {
    algorithm: "HS256",
    expiresIn: state?.refresh ? "1d" : "5m",
  });
};

const verifyJWT = (token: string) => {
  try {
    console.log("Token:", token, typeof token);
    const secret = process.env.JWT_TOKEN_SECRET as string;
    console.log("Secret:", secret, typeof secret);
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }
    console.log("hello");
    const verified = jwt.verify(token, secret);
    console.log("Verified:", verified);
    return verified;
  } catch (error: any) {
    console.error("JWT verification error:", error.message);
    throw error;
  }
};

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  console.log(req.cookies);

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  if (!accessToken) {
    res.status(401).send("Access Denied. No access token provided.");
    return;
  }

  if (!refreshToken) {
    res.status(401).send("Access Denied. No refresh token provided.");
    return;
  }

  if (!process.env.JWT_TOKEN_SECRET) {
    res.status(401).send("Access Denied. JWT secret is not defined.");
    return;
  }

  //NO REFRESH TOKEN, PERHAPS NEED TO MAKE LOGOUT ROUTE TO TEST THIS

  console.log("about to try");

  try {
    const payload = verifyJWT(accessToken as string);
    console.log("Payload:", payload);
    (req as any).payload = payload;
    console.log("Payload:", (req as any).payload);
    (req as any).user = (payload as JwtPayload).user;
    console.log("User:", (req as any).user);

    next();
  } catch (error) {
    if (!refreshToken) {
      res.status(401).send("Access Denied. No refresh token provided.");
      next(error);
      return;
    }
  }

  try {
    const payload = verifyJWT(refreshToken);
    const newAccessToken = generateJWT(payload as JwtPayload, {
      refresh: true,
    });

    console.log(newAccessToken);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", newAccessToken)
      .json({ user: (payload as JwtPayload).user, token: newAccessToken });
  } catch (error) {
    res.status(401).send("Access Denied. Invalid refresh token.");
    next(error);
  }
}

export { isAuthenticated, generateJWT, verifyJWT };
