import { Router } from "express";
import userController from "../controller/user-controller.js";

const userRouter = Router();

userRouter.get("/myid", userController.getMyId);

userRouter.post("/photo", userController.getPhoto);

userRouter.post("/login", userController.loginUser);

userRouter.get("/logout", userController.logoutUser);

userRouter.post("/create", userController.createUser);

userRouter.post("/update", userController.updateUser);

userRouter.get("/allgroups", userController.getAllGroups);

// userRouter.get("/contact", userController.getContact);

userRouter.get("/:id", userController.getUser); // router ini harus ada di atas yang paling bawah

// Router paling bawah
userRouter.use("/", (req, res) => {
  res.json({
    message: "No controller found for this route",
  });
});

export default userRouter;
