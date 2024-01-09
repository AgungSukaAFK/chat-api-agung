import { Router } from "express";
import groupController from "../controller/group-controller.js";

const groupRouter = Router();

// Membuat private group (conversation)
groupRouter.post("/conversation", groupController.createConversation);

groupRouter.get("/public", groupController.getPublicGroups);

groupRouter.get("/conversation", groupController.getConversations);

export default groupRouter;
