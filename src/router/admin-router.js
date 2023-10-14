import { Router } from "express";
import adminController from "../controller/admin-controller.js";


let adminRouter = Router()
//BeginRoutes

adminRouter.get("/addgroup", adminController.getGroups)

adminRouter.post("/addgroup", adminController.createGroup)

// End routes
export default adminRouter