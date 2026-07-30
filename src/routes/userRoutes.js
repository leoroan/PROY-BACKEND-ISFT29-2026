import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { validateCreateUser, validateUpdateUser } from "../validators/userValidator.js";

const router = Router();

/**
 * Base: /api/usuarios
 */

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateCreateUser, createUser);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
