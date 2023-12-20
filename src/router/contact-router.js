import { Router } from "express";
import contactController from "../controller/contact-controller.js";
const contactRouter = Router();

// GET user contacts groupIds
contactRouter.get("/ggis", contactController.getGroupIds);

// GET user contacts userIds
contactRouter.get("/guis", contactController.getUserIds);

// POST add groupId
contactRouter.post("/addgis", contactController.addGroupid);

// GET

export default contactRouter;
