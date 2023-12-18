import { Router } from "express";
import dashboardController from "../controller/dashboard-controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.getDashboardData);

export default dashboardRouter;
