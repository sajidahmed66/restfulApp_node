import { Router } from "express";
import { AuthController } from "../controller/AuthController";
const router = Router();

router.route("/logIn").post(AuthController.logIn);

router.route("/signUp").post(AuthController.signUp);

export { router as authRouter };
