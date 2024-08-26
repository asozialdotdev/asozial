import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ObjectId } from "mongoose";

import Project from "../models/Project.models";
import ProjectPost from "../models/ProjectPost.models";
import ProjectPostReply from "../models/ProjectPostReply.models";
import User from "../models/User.models";
import { generateSlug } from "../utils";
import { Types } from "mongoose";

const projectsRouter = express.Router();

dotenv.config();

// GET search for all projects

projectsRouter.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Explore is called");
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
        .populate("membersJoined", "info.username info.name info.image")
        .populate("owner", "info.username info.name info.image")
        .exec();
      const totalProjects = await Project.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalProjects / +limit);
      console.log({ projects, totalPages, currentPage: +page });
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
        .populate("membersJoined", "info.username info.name info.image")
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
        membersJoined: { $in: [userId] },
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
        .populate("membersJoined", "info.username info.name info.image")
        .populate("owner", "info.username info.name info.image")
        .exec();

      console.log("memebers projects>>>>>>>>>>>>>", projects);

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
    console.log("Title", title, "User ID", userId);
    try {
      const existingProject = await Project.findOne({ title, owner: userId });
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
      console.log("githubRepo:::::::::::::", githubRepo);

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

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to create a project from Github

projectsRouter.post(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Body in Github function", req.body);
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

      const regex = /https:\/\/api\.github\.com\/repos\/([^\/]+)\/([^\/]+)/;
      const match = repoUrl.match(regex);
      if (!match) {
        return res.status(400).json({ error: "Invalid GitHub API URL format" });
      }

      const [_, repoOwner, repoName] = match;
      const normalizedRepoUrl = `https://github.com/${repoOwner}/${repoName}`;

      const existingProject = await Project.findOne({
        githubRepo: normalizedRepoUrl,
      });
      if (existingProject) {
        return res.status(409).json({
          error: "Project with this GitHub repository already exists",
        });
      }

      const repoInfo: any = await axios.get(repoUrl);
      if (repoInfo.status !== 200) {
        return res
          .status(repoInfo.status)
          .json({ error: "Failed to fetch repository information" });
      }
      console.log(repoInfo.data.owner.id);
      console.log(owner?.github?.id);

      if (owner?.github?.id !== repoInfo.data.owner?.id) {
        return res
          .status(403)
          .json({ error: "User is not the owner of this repository" });
      }

      const { name, description, html_url, language } = repoInfo.data;
      const slug = generateSlug(name);

      const sanitizedDescription = description === null ? "" : language;
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
    console.log("Applied members is called");
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId query parameter is required" });
    }

    try {
      // Find all projects owned by the user where there are members in the `membersApplied` array
      const projects = await Project.find({
        owner: userId,
        membersApplied: { $exists: true, $ne: [] }, // Only get projects with members applied
      })
        .select("_id slug title membersApplied")
        .populate("membersApplied", "info.username info.name info.image")
        .exec();

      res.json(projects);
    } catch (error) {
      console.log("Error fetching applied members:", error);
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
        .populate("membersJoined", "info.name info.username info.image")
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

// GET project by slug (not working)

projectsRouter.get(
  "/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Slug>>>>>>>>>>>>>", req.params.slug);
    try {
      const project = await Project.findOne({ slug: req.params.slug })
        .populate("membersJoined", "info.name info.username info.image")
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

//APPLY, JOIN, DECLINE AND LEAVE PROJECTS

// POST request to apply to a project (APPLY)
projectsRouter.post(
  "/:projectId/apply",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Apply is called");
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

      if (project.membersApplied.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User already applied to be a memeber" });
      }

      if (user.projects?.projectsApplied.includes(project._id)) {
        return res
          .status(400)
          .json({ error: "User already applied to this project" });
      }

      if (project.membersJoined.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $push: { membersApplied: userId },
        }
      );

      await User.updateOne(
        { _id: userId },
        {
          $push: { projectsApplied: project._id },
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

// POST request to accept a user to a project (JOIN)
projectsRouter.post(
  "/:projectId/join",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { memberId, userId } = req.body;
      const project = await Project.findById(projectId)
        .populate("owner", "info.username")
        .exec();

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to accept this user" });
      }

      if (project.membersJoined.includes(memberId)) {
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
          $push: { membersJoined: memberId },
          $pull: { membersApplied: memberId },
        }
      );

      await User.updateOne(
        { _id: memberId },
        {
          $push: { projectsJoined: project._id },
          $pull: { projectsApplied: project._id },
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

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to decline this user" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { membersApplied: memberId },
          $push: { membersDeclined: memberId },
        }
      );

      const member = await User.findById(memberId);

      if (!member) {
        return res.status(404).json({ error: "User not found" });
      }

      await User.updateOne(
        { _id: memberId },
        {
          $pull: { projectsApplied: project._id },
          $push: { projectsDeclined: project._id },
        }
      );

      await project.save();
      await member.save();

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

      if (project.membersJoined.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User is not a member of this project" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await Project.updateOne(
        { _id: project._id },
        {
          $pull: { membersJoined: userId },
        }
      );

      await User.updateOne(
        { _id: userId },
        {
          $pull: { projectsJoined: project._id },
        }
      );

      await project.save();
      await user.save();

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

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.membersJoined.includes(memberId)) {
        return res
          .status(400)
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
          $pull: { membersJoined: memberId },
          $push: { membersAvoided: memberId },
        }
      );

      await User.updateOne(
        { _id: memberId },
        {
          $pull: { projectsJoined: project._id },
          $push: { projectsAvoided: project._id },
        }
      );
      await project.save();
      await member.save();

      res.json(project);
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
        isMember: project.membersJoined.includes(user?._id!),
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

//PATCH to update pitch
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

// GET request to get project (tinderlike)

projectsRouter.get(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { actualUser, targetProject } = req.body;

      const user = await User.findById(actualUser);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isProjectAlreadyMatched =
        user.matches?.projects?.suggested.includes(targetProject) ||
        user.matches?.projects?.pending.includes(targetProject) ||
        user.matches?.projects?.accepted.includes(targetProject) ||
        user.matches?.projects?.declined.includes(targetProject);

      if (isProjectAlreadyMatched) {
        return res.status(200).json({
          message: "Project already matched or suggested to the user.",
        });
      }

      const filteredProjects = await Project.aggregate([
        {
          $match: {
            _id: {
              $nin: user.matches?.projects?.suggested.concat(
                user.matches?.projects?.pending,
                user.matches?.projects?.accepted,
                user.matches?.projects?.declined
              ),
            },
            mainLanguage: { $in: user.skills?.languagesSpoken },
          },
        },
        {
          $addFields: {
            techStackMatches: {
              $size: {
                $setIntersection: [
                  "$techStack",
                  user.skills?.codingLanguages.map((cl: any) => cl.language),
                ],
              },
            },
          },
        },
        {
          $sort: { techStackMatches: -1 },
        },
      ]);

      user.matches?.projects?.suggested.push(targetProject);
      await user.save();

      res.status(200).json({
        message: "Project matched successfully",
        suggestedProjects: filteredProjects,
      });
    } catch (error) {
      console.error("Error fetching matched projects:", error);
      next(error);
    }
  }
);

// POST request to match project (tinderlike)

projectsRouter.post(
  "/match",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { actualUser } = req.body;
      const { projectId } = req.body;
      const foundProject = await Project.findById(projectId);

      if (!foundProject) {
        res.status(404).json({ error: "Project not found" });
        console.error("Project not found");
        return;
      }
      actualUser.matches.projects.pending.push(foundProject);
      await actualUser.save();

      foundProject.membersApplied.push(actualUser._id);
      await foundProject.save();

      const populatedActualUser = await User.findById(actualUser._id).populate(
        "projectsApplied"
      );

      const populatedFoundProject = await Project.findById(
        foundProject._id
      ).populate("membersApplied");

      res.status(200).json({
        message: "User have matched with a Project",
        actualUser: populatedActualUser,
        foundProject: populatedFoundProject,
      });
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
          $push: { membersJoined: matchedUserId },
          $pull: { membersApplied: matchedUserId },
        },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        { _id: matchedUserId },
        {
          $push: { "matches.projects.accepted": project._id },
          $pull: {
            "matches.projects.pending": project._id,
            "matches.projects.suggested": project._id,
          },
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
          $push: { membersDeclined: matchedUserId },
          $pull: { membersApplied: matchedUserId },
        },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        { _id: matchedUserId },
        {
          $push: { "matches.projects.declined": project._id },
          $pull: {
            "matches.projects.pending": project._id,
            "matches.projects.suggested": project._id,
          },
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
