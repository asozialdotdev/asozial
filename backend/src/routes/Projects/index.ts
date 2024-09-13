import express from "express";

import { getAllProjects } from "./getAllProjects";
import { getMyProjects } from "./getMyProjects";
import { getProjectsByMember } from "./getProjectsByMember";
import { checkProjectTitle } from "./checkProjectTitle";
import { createNewProject } from "./createNewProject";
import { createProjectFromGithub } from "./createProjectFromGithub";
import { getAppliedMembers } from "./getAppliedMembers";
import { getProjectById } from "./getProjectById";
import { getProjectMembers } from "./getProjectMembers";
import { applyToProject } from "./applyToProject";
import { acceptProjectMember } from "./acceptProjectMember";
import { declineProjectMember } from "./declineProjectMember";
import { leaveProject } from "./leaveProject";
import { removeProjectMember } from "./removeProjectMember";
import { restoreProjectMember } from "./restoreProjectMember";
import { checkIfUserIsMember } from "./checkIfUserIsMember";
import { checkIfUserIsOwner } from "./checkIfUserIsOwner";
import { checkIfUserHasApplied } from "./checkIfUserHasApplied";
import { updateProject } from "./updateProject";
import { updateProjectDescription } from "./updateProjectDescription";
import { updateProjectPitch } from "./updateProjectPitch";
import { updateProjectLanguage } from "./updateProjectLanguage";
import { deleteProject } from "./deleteProject";

const projectsRouter = express.Router();

projectsRouter.get("/all", getAllProjects);
projectsRouter.get("/my-projects", getMyProjects);
projectsRouter.get("/member", getProjectsByMember);
projectsRouter.get("/check-title", checkProjectTitle);
projectsRouter.post("/new", createNewProject);
projectsRouter.post("/github", createProjectFromGithub);
projectsRouter.get("/applied-members", getAppliedMembers);
projectsRouter.get("/:projectId", getProjectById);
projectsRouter.get("/:projectId/members", getProjectMembers);
projectsRouter.post("/:projectId/apply", applyToProject);
projectsRouter.post("/:projectId/accept", acceptProjectMember);
projectsRouter.post("/:projectId/decline", declineProjectMember);
projectsRouter.post("/:projectId/leave", leaveProject);
projectsRouter.post("/:projectId/remove", removeProjectMember);
projectsRouter.post("/:projectId/restore", restoreProjectMember);
projectsRouter.get("/:projectId/is-member", checkIfUserIsMember);
projectsRouter.get("/:projectId/is-owner", checkIfUserIsOwner);
projectsRouter.get("/:projectId/has-applied", checkIfUserHasApplied);
projectsRouter.put("/:projectId", updateProject);
projectsRouter.patch("/:projectId/description", updateProjectDescription);
projectsRouter.patch("/:projectId/pitch", updateProjectPitch);
projectsRouter.patch("/:projectId/main-language", updateProjectLanguage);
projectsRouter.delete("/:projectId", deleteProject);

export default projectsRouter;
