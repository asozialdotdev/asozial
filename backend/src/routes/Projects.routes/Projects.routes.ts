import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

import Project from "../../models/Project.models";
import ProjectPost from "../../models/ProjectPost.models";
import ProjectPostReply from "../../models/ProjectPostReply.models";
import User from "../../models/User.models";
import { generateSlug } from "../../utils";

const projectsRouter = express.Router();

dotenv.config();

// GET search for all projects

projectsRouter.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    const { query, page = 1, limit = 12 } = req.query;

    try {
      const searchQuery = query
        ? {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { techStack: { $regex: query, $options: "i" } },
            ],
          }
        : {};

      const projects = await Project.find(searchQuery)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .populate("members.membersJoined", "info.username info.name info.image")
        .populate("owner", "info.username info.name info.image")
        .exec();
      const totalProjects = await Project.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalProjects / +limit);
      res.json({
        projects,
        totalPages,
        currentPage: +page,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET search for projects from a user (my-projects)
projectsRouter.get(
  "/my-projects",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, query, page = 1, limit = 12 } = req.query;

    try {
      const searchQuery = query
        ? {
            owner: userId,
            $or: [
              { title: { $regex: query, $options: "i" } },
              { techStack: { $regex: query, $options: "i" } },
            ],
          }
        : { owner: userId };

      const projects = await Project.find(searchQuery)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .populate("members.membersJoined", "info.username info.name info.image")
        .populate("owner", "info.username info.name info.image")
        .exec();

      const totalProjects = await Project.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalProjects / +limit);

      res.json({
        projects,
        totalPages,
        currentPage: +page,
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET search for projects that a user is a member of
projectsRouter.get(
  "/member",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, query, page = 1, limit = 12 } = req.query;

    try {
      const searchQuery = {
        "members.membersJoined": { $in: [userId] },
        ...(query && {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { techStack: { $regex: query, $options: "i" } },
          ],
        }),
      };

      const projects = await Project.find(searchQuery)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .populate("members.membersJoined", "info.username info.name info.image")
        .populate("owner", "info.username info.name info.image")
        .exec();

      const totalProjects = await Project.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalProjects / +limit);

      res.json({
        projects,
        totalPages,
        currentPage: +page,
      });
    } catch (error) {
      next(error);
    }
  }
);

//GET check if project title is unique

projectsRouter.get(
  "/check-title",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, userId } = req.query;
    try {
      const existingProject = await Project.findOne({
        title: { $regex: `^${title}$`, $options: "i" },
        owner: userId,
      });

      res.json({ isUnique: !existingProject });
    } catch (error) {
      next(error);
    }
  }
);

// POST to create a new project

projectsRouter.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        description,
        pitch,
        techStack,
        mainLanguage,
        githubRepo,
        socials,
        image,
        placeholder,
        slug,
        userId,
      } = req.body;

      const newProject = await Project.create({
        title,
        description,
        pitch,
        techStack,
        mainLanguage,
        githubRepo,
        image,
        placeholder,
        socials,
        slug,
        owner: userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { "projects.projectsOwned": newProject._id },
      });

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to create a project from Github

projectsRouter.post(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { repoUrl, userId } = req.body;

      if (!repoUrl) {
        return res
          .status(400)
          .json({ error: "repoUrl query parameter is required" });
      }
      if (!userId) {
        return res
          .status(400)
          .json({ error: "userId query parameter is required" });
      }

      const owner = await User.findById(userId);
      if (!owner) {
        return res.status(404).json({ error: "User not found" });
      }

      const repoInfo: any = await axios.get(repoUrl);
      if (repoInfo.status !== 200) {
        return res
          .status(repoInfo.status)
          .json({ error: "Failed to fetch repository information" });
      }

      // if (owner?.github?.id !== repoInfo.data.owner?.id) {
      //   return res
      //     .status(403)
      //     .json({ error: "User is not the owner of this repository" });
      // }

      const { name, description, html_url, language } = repoInfo.data;
      const slug = generateSlug(name);

      const sanitizedDescription = description === null ? "" : description;
      const sanitizedLanguage = language === null ? "Other" : language;

      const createProject = await Project.create({
        title: name,
        description: sanitizedDescription,
        githubRepo: html_url,
        pitch: "",
        techStack: [sanitizedLanguage],
        owner: userId,
        status: "active",
        slug,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { "projects.projectsOwned": createProject._id },
      });

      res.status(201).json(createProject);
    } catch (error) {
      next(error);
    }
  }
);
// GET all members who have applied to a user's projects
projectsRouter.get(
  "/applied-members",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId query parameter is required" });
    }

    try {
      // Find all projects owned by the user where there are members in the `membersApplied` array
      const membersApplied = await Project.find({
        owner: userId,
        "members.membersApplied": { $exists: true, $ne: [] }, // Only get membersApplied with members applied
      })
        .select("_id slug title owner members.membersApplied")
        .populate(
          "members.membersApplied",
          "info.username info.name info.image"
        )
        .populate("owner", "info.username")
        .exec();
      res.json(membersApplied);
    } catch (error) {
      next(error);
    }
  }
);

// GET project by ID (detailed information)
projectsRouter.get(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId)
        .populate("members.membersJoined", "info.name info.username info.image")
        .populate("owner", "info.name info.username info.image")
        .exec();
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// GET project by ID (detailed information)
projectsRouter.get(
  "/:projectId/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId)
        .populate("members.membersJoined", "info.name info.username info.image")
        .populate(
          "members.membersApplied",
          "info.name info.username info.image"
        )
        .populate(
          "members.membersInvited",
          "info.name info.username info.image"
        )
        .populate(
          "members.membersAvoided",
          "info.name info.username info.image"
        )
        .populate("owner", "info.name info.username info.image")
        .exec();

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const result = {
        membersJoined: project.members?.membersJoined,
        membersApplied: project.members?.membersApplied,
        membersInvited: project.members?.membersInvited,
        membersAvoided: project.members?.membersAvoided,
        owner: project.owner,
      };

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

//APPLY, JOIN, DECLINE, LEAVE, REMOVE, RESTORE PROJECTS

// POST request to apply to a project (APPLY)
projectsRouter.post(
  "/:projectId/apply",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const project = await Project.findById(req.params.projectId)
        .populate("owner", "info.username")
        .exec();
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (project.members?.membersApplied.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User already applied to be a member" });
      }

      if (project.members?.membersJoined.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      if (user.projects?.projectsApplied.includes(project._id)) {
        return res
          .status(400)
          .json({ error: "User already applied to this project" });
      }
      if (user.projects?.projectsJoined.includes(project._id)) {
        console.log("User is in the projectsJoined array");
        return res
          .status(400)
          .json({ error: "User already applied to this project" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $push: { "members.membersApplied": userId },
        }
      );

      await User.updateOne(
        { _id: userId },
        {
          $push: { "projects.projectsApplied": project._id },
        }
      );

      console.log("Project applied>>>>>>>>>>", project);
      console.log("User applied>>>>>>>>>>", user);
      res.status(200).json({ project, user });
    } catch (error) {
      next(error);
    }
  }
);

// POST request to accept a user to a project (ACCEPT)
projectsRouter.post(
  "/:projectId/accept",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { memberId, userId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();

      console.log("Project owner", project?.owner);
      console.log("User ID", userId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      if (project.owner._id.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to accept this user" });
      }

      if (project.members?.membersJoined.includes(memberId)) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      const member = await User.findById(memberId);

      if (!member) {
        return res.status(404).json({ error: "User not found" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $push: { "members.membersJoined": memberId },
          $pull: { "members.membersApplied": memberId },
        }
      );

      await User.updateOne(
        { _id: memberId },
        {
          $push: { "projects.projectsJoined": project._id },
          $pull: { "projects.projectsApplied": project._id },
        }
      );

      res.status(200).json({ project, member });
    } catch (error) {
      next(error);
    }
  }
);

// POST request to DECLINE a user from a project (DECLINE)
projectsRouter.post(
  "/:projectId/decline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { memberId, userId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();

      console.log("project found in decline", project);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.owner._id.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to decline this user" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { "members.membersApplied": memberId },
          $push: { "members.membersAvoided": memberId },
        }
      );

      const member = await User.findById(memberId);

      if (!member) {
        return res.status(404).json({ error: "User not found" });
      }

      await User.updateOne(
        { _id: memberId },
        {
          $pull: { "projects.projectsApplied": project._id },
          $push: { "projects.projectsDeclined": project._id },
        }
      );

      res.json({ project, member });
    } catch (error) {
      next(error);
    }
  }
);

// POST request to LEAVE a project (LEAVE)
projectsRouter.post(
  "/:projectId/leave",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { userId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!project.members?.membersJoined.includes(user._id)) {
        return res
          .status(400)
          .json({ error: "User is not a member of this project" });
      }

      if (!user.projects?.projectsJoined.includes(project._id)) {
        console.log("User is NOT in the projectsApplied array");
        return res
          .status(400)
          .json({ error: "User is not member of this project" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { "members.membersJoined": userId },
        }
      );

      await User.updateOne(
        { _id: userId },
        {
          $pull: { "projects.projectsJoined": project._id },
        }
      );

      res.json({ project, user });
    } catch (error) {
      next(error);
    }
  }
);

// POST request to REMOVE a user from a project (REMOVE)
projectsRouter.post(
  "/:projectId/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { userId, memberId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();
      console.log("memberId", memberId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (!project.members?.membersJoined.includes(memberId)) {
        return res
          .status(401)
          .json({ error: "User is not a member of this project" });
      }

      if (project.owner._id.toString() !== userId) {
        return res
          .status(402)
          .json({ error: "You are not authorized to remove this user" });
      }

      const member = await User.findById(memberId);

      if (!member) {
        return res.status(403).json({ error: "User not found" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { "members.membersJoined": memberId },
          $push: { "members.membersAvoided": memberId },
        }
      );

      await User.updateOne(
        { _id: memberId },
        {
          $pull: { "projects.projectsJoined": project._id },
          $push: { "projects.projectsDeclined": project._id },
        }
      );

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to REMOVE a user from a project (RESTORE)
projectsRouter.post(
  "/:projectId/restore",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { userId, memberId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();
      console.log("memberId", memberId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (!project.members?.membersAvoided.includes(memberId)) {
        return res
          .status(401)
          .json({ error: "User is not a member of this project" });
      }

      if (project.owner._id.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to remove this user" });
      }

      const member = await User.findById(memberId);

      if (!member) {
        return res.status(404).json({ error: "User not found" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { "members.membersAvoided": memberId },
          $push: { "members.membersJoined": memberId },
        }
      );

      await User.updateOne(
        { _id: memberId },
        {
          $pull: { "projects.projectsDeclined": project._id },
          $push: { "projects.projectsJoined": project._id },
        }
      );

      res.json({ project, member });
    } catch (error) {
      next(error);
    }
  }
);

// GET check if user is a member of a project
projectsRouter.get(
  "/:projectId/is-member",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const { userId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        isMember: project.members?.membersJoined.includes(user?._id!),
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET check if user is owner of a project
projectsRouter.get(
  "/:projectId/is-owner",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const { userId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isOwner = project.owner._id.toString() === user?._id!.toString();

      res.json({
        isOwner,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Check ig user has applied to a project
projectsRouter.get(
  "/:projectId/has-applied",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const { userId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const hasApplied = project.members?.membersApplied.includes(user?._id!);

      res.json({
        hasApplied,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PUT request to update a project

projectsRouter.put(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        description,
        pitch,
        techStack,
        githubRepo,
        mainLanguage,
        socials,
        status,
        image,
        slug,
        placeholder,
        userId,
      } = req.body;

      // Find the project first
      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if the current user is the owner of the project
      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          title,
          description,
          pitch,
          techStack,
          githubRepo,
          mainLanguage,
          socials,
          status,
          image,
          placeholder,
          slug,
        },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

//PATCH to update description
projectsRouter.patch(
  "/:projectId/description",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { description, userId } = req.body;

      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        { description },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

//PATCH to update pitch
projectsRouter.patch(
  "/:projectId/pitch",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pitch, userId } = req.body;

      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        { pitch },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH to update main language

projectsRouter.patch(
  "/:projectId/main-language",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mainLanguage, userId } = req.body;

      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        { mainLanguage },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// PUT REQUEST TO ACCEPT A USER IN A PROJECT(DOABLE ONLY BY THE PROJECT OWNER)

projectsRouter.put(
  "/:projectId/accept",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { ownerId, matchedUserId } = req.body;

      const project = await Project.findByIdAndUpdate(
        { _id: projectId, owner: ownerId },
        {
          $push: { "members.membersJoined": matchedUserId },
          $pull: { "members.membersApplied": matchedUserId },
        },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        { _id: matchedUserId },
        {
          $push: { "projects.projectsJoined": project._id },
        },
        { new: true }
      );

      res.status(200).json({
        message: "User accepted successfully",
        project: project,
        user: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PUT REQUEST TO DECLINE A USER IN A PROJECT

projectsRouter.put(
  "/:projectId/decline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { ownerId, matchedUserId } = req.body;

      const project = await Project.findByIdAndUpdate(
        { _id: projectId, owner: ownerId },
        {
          $push: { "members.membersAvoided": matchedUserId },
          $pull: { "members.membersApplied": matchedUserId },
        },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        { _id: matchedUserId },
        {
          $push: { "projects.projectsDeclined": project._id },
        },
        { new: true }
      );

      res.status(200).json({
        message: "User declined successfully",
        project: project,
        user: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE Project

// Delete a project and associated posts and replies
projectsRouter.delete("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (userId !== project.owner._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this project" });
    }

    const posts = await ProjectPost.find({ projectId });

    for (const post of posts) {
      await ProjectPostReply.deleteMany({ projectPostId: post._id });
    }

    await ProjectPost.deleteMany({ projectId });

    await User.findOneAndUpdate(
      { _id: project.owner._id },
      { $pull: { "projects.projectsOwned": project._id } }
    );

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      message:
        "Project and all associated posts and replies deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project." });
  }
});

export default projectsRouter;
