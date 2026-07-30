/**
 * Validaciones simples para el modelo User.
 * Se ejecutan antes de llegar al controlador.
 */

export const validateCreateUser = (req, res, next) => {
  const { nombre, email, password } = req.body;
  const errors = [];

  if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
    errors.push("El nombre es obligatorio y debe tener al menos 2 caracteres");
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("El email es obligatorio y debe tener un formato válido");
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push("La contraseña es obligatoria y debe tener al menos 6 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Error de validación", detalles: errors });
  }

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { nombre, email, password, rol } = req.body;
  const errors = [];

  if (nombre !== undefined && (typeof nombre !== "string" || nombre.trim().length < 2)) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("El email debe tener un formato válido");
  }

  if (password !== undefined && password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres");
  }

  if (rol !== undefined && !["admin", "usuario", "invitado"].includes(rol)) {
    errors.push("El rol debe ser admin, usuario o invitado");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Error de validación", detalles: errors });
  }

  next();
};
