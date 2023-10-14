import { Router } from "express";
import groupController from "../controller/group-controller.js";

const groupRouter = Router();

// Membuat private group (conversation)
groupRouter.post("/", groupController.createPrivateGroup)

export default groupRouter