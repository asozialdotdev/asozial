import express from "express";
import { createFriendship } from "./createFriendship";
import { acceptFriendship } from "./acceptFriendship";
import { declineFriendship } from "./declineFriendship";
import { getAllPendingFriends } from "./getAllPendingFriends";
import { getAllDeclinedFriends } from "./getAllDeclinedFriends";
import { deleteFriendship } from "./deleteFriendship";
import { getFriendshipStatus } from "./getFriendshipStatus";

const friendshipsRouter = express.Router();

friendshipsRouter.post("/", createFriendship);
friendshipsRouter.put("/:friendshipId/accept", acceptFriendship);
friendshipsRouter.put("/:friendshipId/decline", declineFriendship);
friendshipsRouter.get("/pending", getAllPendingFriends);
friendshipsRouter.get("/declined", getAllDeclinedFriends);
friendshipsRouter.delete("/", deleteFriendship);
friendshipsRouter.get("/:username/status", getFriendshipStatus);

export default friendshipsRouter;
