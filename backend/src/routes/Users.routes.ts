import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import Friendship from "../models/Friendship.models";
import Project from "../models/Project.models";

const usersRouter = express.Router();

// GET user friends
// rendered in the /users route
// TODO must check also for freindships status

usersRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      if (!foundUser) {
        throw new Error("User not found");
      }

      const friendships = await Friendship.find({
        // TODO the following filters must be reviewed because the logic of it is not really working.
        $or: [
          { senderId: foundUser._id, status: "accepted" },
          { receiverId: foundUser._id, status: "accepted" },
        ],
      });

      const friendIds = friendships
        .flatMap((friendship) => [
          friendship.senderId.toString(),
          friendship.receiverId.toString(),
        ])
        .filter((id) => id !== foundUser._id.toString());

      const friends = await User.find({ _id: { $in: friendIds } });

      res.json({
        user: foundUser,
        friends: friends,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET all users

usersRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundUser = await User.find();
      res.json(foundUser);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 user

usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUserId = req.params._id;
      const targetUserId = req.params.userId;

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      const friendships = await Friendship.findOne({
        $or: [
          { senderId: currentUserId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: currentUserId },
        ],
        status: "accepted",
      });

      if (friendships) {
        res.json({
          user: targetUser,
        });
      } else {
        res.json({
          message: "You are not friend with this user",
          basicInfo: {
            username: targetUser.username,
            name: targetUser.name,
            email: targetUser.email,
            avatarUrl: targetUser.avatarUrl,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//GET logged in user

usersRouter.get(
  "/account",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //GET CURRENT USER FROM MIDDLEWARE
      const user = await User.findById(req.params.userId);
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// GET user to Match (tinderlike)

usersRouter.get(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;
      const avoidedUsers = await User.find({
        _id: { $in: actualUser.avoidedUsers },
      });

      const filteredUsers = await User.find({
        _id: { $nin: avoidedUsers.map((user) => user.id) },
      });

      res.status(200).json(filteredUsers);
    } catch (error) {
      next(error);
    }
  }
);

// POST user to Match (tinderlike)

usersRouter.post(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actualUser = (req as any).payload.user;
      const targetUser = await User.findById(req.body.userId);

      if (!targetUser) {
        res.status(404).send("User not found");
        console.error("User not found");
        return;
      }

      actualUser.matchedUsers.push(targetUser);
      await actualUser.save();

      targetUser.matchedUsers.push(actualUser._id);
      await targetUser.save();

      const populatedActualUser = await User.findById(actualUser._id).populate(
        "matchedUsers"
      );
      const populatedTargetUser = await User.findById(targetUser).populate(
        "matchedUsers"
      );

      res.status(200).json({
        message: "Users matched successfully",
        actualUser: populatedActualUser,
        targetUser: populatedTargetUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET user's friends and user's activities

// GET all projects that a user is a member of

usersRouter.get(
  "/:userId/projects",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).payload.user;
      const projects = await Project.find({ membersJoined: user._id });
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }
);

export default usersRouter;
