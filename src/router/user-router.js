import { Router } from "express";
import userController from "../controller/user-controller.js";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);

userRouter.post("/logout", userController.logoutUser);

userRouter.post("/create", userController.createUser);

userRouter.get("/:id", userController.getUser);



userRouter.use("/", (req, res) => {
    res.json({
        message: "No controller found for this route"
    })
})

export default userRouter