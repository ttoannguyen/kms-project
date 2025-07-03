import express from "express";
import { userController } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.post("/register", userController.registerUser);

export default userRouter;
