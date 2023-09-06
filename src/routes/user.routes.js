import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const controller = new UserController();

const router = Router();

router.post("/register", controller.register);
router.post("/register-front", controller.registerFront);
router.post("/login", controller.login);
router.post("/login-front", controller.loginFront);
router.get("/logout", controller.logout);
router.get("/logout-front", controller.logoutFront);

export default router;
