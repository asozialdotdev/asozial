import express from "express";
import { getFriendsMessages } from "./getFriendsMessages";
import { createNewMessage } from "./createNewMessage";

const messagesRouter = express.Router();

messagesRouter.get("/:friendshipId", getFriendsMessages);
messagesRouter.post("/:friendshipId", createNewMessage);

export default messagesRouter;
