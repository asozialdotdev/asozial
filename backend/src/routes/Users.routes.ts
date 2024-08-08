import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";

const usersRouter = express.Router();

// GET 1 user
usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      res.json(foundUser);
    } catch (error) {
      next(error);
    }
  }
);

// GET all users

export default usersRouter;
