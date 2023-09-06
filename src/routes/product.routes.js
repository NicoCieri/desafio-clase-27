import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import { uploader } from "../middlewares/multer.js";
import validateProduct from "../middlewares/validateProductFields.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  uploader.single("thumbnail"),
  validateProduct,
  controller.create
);
router.put(
  "/:id",
  uploader.single("thumbnail"),
  validateProduct,
  controller.update
);
router.delete("/:id", controller.remove);

export default router;
