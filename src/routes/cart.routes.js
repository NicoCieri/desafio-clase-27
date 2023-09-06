import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/:id/product/:productId", controller.addProductToCart);
router.delete("/:id/product/:productId", controller.removeProductFromCart);
router.put("/:id", controller.updateCartItems);
router.put("/:id/product/:productId", controller.updateProductQuantity);
router.delete("/:id", controller.removeProducts);

export default router;
