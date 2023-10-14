import { Router } from "express";
import contactController from "../controller/contact-controller.js";
const contactRouter = Router();

contactRouter.post("/", contactController.addContact)

export default contactRouter