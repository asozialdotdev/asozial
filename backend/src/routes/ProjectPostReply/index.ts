import express from "express";
import { toggleLikeOnReply } from "./toggleLikeOnReply";
import { toggleDislikeOnReply } from "./toggleDislikeOnReply";
import { editProjectPostReply } from "./editProjectPostReply";
import { markReplyAsDeleted } from "./markReplyAsDeleted";

const projectPostReplyRouter = express.Router();

projectPostReplyRouter.post("/:replyId/like", toggleLikeOnReply);
projectPostReplyRouter.post("/:replyId/dislike", toggleDislikeOnReply);
projectPostReplyRouter.put("/:replyId", editProjectPostReply);
projectPostReplyRouter.patch("/:replyId", markReplyAsDeleted);

export default projectPostReplyRouter;
