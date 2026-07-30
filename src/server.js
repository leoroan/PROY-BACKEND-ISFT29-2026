import dotenv from "dotenv";
dotenv.config({ quiet: true });

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

/**
 * Inicia del servidor.
 * - Conectar a MongoDB.
 * - Iniciar Express.
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
