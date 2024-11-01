import { Request, Response, NextFunction } from "express";

export const getAccountInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};
