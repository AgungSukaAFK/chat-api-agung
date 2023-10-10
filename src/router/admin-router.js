import { Router } from "express";

let adminRouter = Router()
//BeginRoutes

adminRouter.get("/addgroup", (req, res) => {
    res.json({
        message: "admin approved"
    })
})

// End routes
export default adminRouter