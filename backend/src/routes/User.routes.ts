import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";

const router = express.Router();

// POST new user

// GET 1 user
router.get(
  "/users/:userId",
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
