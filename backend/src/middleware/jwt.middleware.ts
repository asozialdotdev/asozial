import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
  return jwt.verify(token, process.env.JWT_TOKEN_SECRET as string);
};

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    res.status(401).send("Access Denied. No token provided.");
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
      next(error);
      return;
    }
  }

  try {
    const payload = verifyJWT(refreshToken);
    const newAccessToken = generateJWT(payload as JwtPayload, {
      refresh: true,
    });

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
