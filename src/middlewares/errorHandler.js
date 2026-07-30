/**
 * Middleware global de manejo de errores.
 */

const errorHandler = (err, req, res, _next) => {
  console.error("Error:", err.message);

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const mensajes = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      error: "Error de validación",
      detalles: mensajes,
    });
  }

  // Error de Casteo (ID inválido)
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "ID inválido",
      detalles: ["El formato del ID proporcionado no es válido"],
    });
  }

  // Error por defecto
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Error interno del servidor",
  });
};

export default errorHandler;
