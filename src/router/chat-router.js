import {Router} from "express";

import chatController from "../controller/chat-controller.js";

const chatRouter = Router();

// Buat chat document baru
chatRouter.post("/create", chatController.createChat)

// Ambil chat
// chatRouter.get("/", chatController.getChat) DI ALIH FUNGSI #1

//  Kirim chat
// chatRouter.post("/", chatController.sendChat) #1
chatRouter.post("/", chatController.chatListener)

export default chatRouter;