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
    const secret = process.env.JWT_TOKEN_SECRET as string;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }
    const verified = jwt.verify(token, secret);
    return verified;
  } catch (error: any) {
    console.log("verification error:", error.message);
  }
};

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!process.env.JWT_TOKEN_SECRET) {
    res.status(401).send("Access Denied. JWT secret is not defined.");
    return;
  }

  if (!accessToken) {
    res.status(401).send("Access Denied. No access token provided.");
    return;
  }

  try {
    const payload = verifyJWT(accessToken as string);
    (req as any).payload = payload;
    (req as any).user = (payload as JwtPayload).user;
    next();
  } catch (error) {
    if (!refreshToken) {
      res.status(401).send("Access Denied. No refresh token provided.");
      return;
    }
    try {
      const payload = verifyJWT(refreshToken);
      const newAccessToken = generateJWT(payload as JwtPayload, {
        refresh: true,
      });
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
        })
        .header("Authorization", newAccessToken)
        .json({ user: (payload as JwtPayload).user, token: newAccessToken });
    } catch (error) {
      res.status(401).send("Access Denied. Invalid refresh token.");
    }
  }
}

export { isAuthenticated, generateJWT, verifyJWT };
