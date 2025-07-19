import { Router } from "express";
import { googleTokenLogin } from "../controllers/users/googleLoginController";

const userRouter = Router()
userRouter.route("/google-login").post(googleTokenLogin)
userRouter.route("/signup").post(googleTokenLogin)
userRouter.route("/signin").post(googleTokenLogin)

export {
    userRouter
}
