import {Router} from "express";

import dashboardController from "../controller/dashboard-controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.getDashboard)

export default dashboardRouter