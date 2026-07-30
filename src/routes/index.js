import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

/**
 * Rutas principales de la API.
 * Agrupa todos los recursos bajo /api.
 */

router.use("/usuarios", userRoutes);
router.use("/productos", productRoutes);

// Ruta de salud (health check)
router.get("/health", (_req, res) => {
  res.json({ estado: "ok", timestamp: new Date().toISOString() });
});

export default router;
