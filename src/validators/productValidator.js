/**
 * Validaciones simples para el modelo Product.
 * Se ejecutan antes de llegar al controlador.
 */

export const validateCreateProduct = (req, res, next) => {
  const { nombre, precio } = req.body;
  const errors = [];

  if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
    errors.push("El nombre del producto es obligatorio y debe tener al menos 2 caracteres");
  }

  if (precio === undefined || typeof precio !== "number" || precio < 0) {
    errors.push("El precio es obligatorio y debe ser un número mayor o igual a 0");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Error de validación", detalles: errors });
  }

  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { nombre, precio, stock } = req.body;
  const errors = [];

  if (nombre !== undefined && (typeof nombre !== "string" || nombre.trim().length < 2)) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (precio !== undefined && (typeof precio !== "number" || precio < 0)) {
    errors.push("El precio debe ser un número mayor o igual a 0");
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    errors.push("El stock debe ser un número mayor o igual a 0");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Error de validación", detalles: errors });
  }

  next();
};
