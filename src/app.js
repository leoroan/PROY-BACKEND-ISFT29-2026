import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { threatLogger } from "@lean/threat-sentinel-client";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  threatLogger({
    endpoint: "https://threat-sentinel.myselfproductions.me",
    sourceApplication: "backend-vtv",
  })
);

// Ruta de salud (health check) en la raíz
app.get("/health", (_req, res) => {
  res.json({ estado: "ok", timestamp: new Date().toISOString(), servicio: "backend-node-w-mongo-v2" });
});

// Rutas de la API
app.use("/api", routes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
