import { Router } from "express";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import * as controller from "../controllers/view.controller.js";

const router = Router();

router.get("/products", optionalAuth, controller.productsView);
router.get("/carts/:id", optionalAuth, controller.cartView);
router.get("/register", controller.registerView);
router.get("/error-register", controller.errorRegisterView);
router.get("/login", controller.loginView);
router.get("/error-login", controller.errorLoginView);

export default router;
