import { Router } from "express";
import dashboardController from "../controller/dashboard-controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.getDashboardData);

dashboardRouter.post("/pindex", dashboardController.getPhotoIndex);

export default dashboardRouter;
