import {Router} from "express";
import chat from "../model/chats-model.js";
import chatController from "../controller/chat-controller.js";

const chatRouter = Router();

// Ambil chat
chatRouter.get("/", chatController.getChat)

//  Kirim chat
chatRouter.post("/", chatController.sendChat)

export default chatRouter;