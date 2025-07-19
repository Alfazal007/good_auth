import { Router } from "express";
import { googleTokenLogin } from "../controllers/users/googleLoginController";
import { signupController } from "../controllers/users/signupController";
import { signinController } from "../controllers/users/signinController";

const userRouter = Router()
userRouter.route("/google-login").post(googleTokenLogin)
userRouter.route("/signup").post(signupController)
userRouter.route("/signin").post(signinController)

export {
    userRouter
}
