import { Router } from "express";
import contactController from "../controller/contact-controller.js";
const contactRouter = Router();

// GET user contacts groupIds
contactRouter.get("/ggis", contactController.getGroupIds);

// GET user contacts userIds
contactRouter.get("/guis", contactController.getUserIds);

// POST add groupId
contactRouter.post("/addgis", contactController.addGroupid);

// POST add userId to contact
contactRouter.post("/adduis", contactController.addUserids);

// POST delete userId from contact
contactRouter.post("/deluis", contactController.deleteUserids);

// GET

export default contactRouter;
