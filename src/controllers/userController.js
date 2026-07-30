import * as userService from "../services/userService.js";

/**
 * Controlador de Usuarios.
 * Solo se encarga de recibir la request, llamar al servicio y enviar la response.
 */

/**
 * Obtener todos los usuarios (activos por defecto).
 * GET /api/usuarios
 */
export const getUsers = async (req, res, next) => {
  try {
    const { incluirInactivos } = req.query;
    const usuarios = await userService.getAllUsers(incluirInactivos === "true");
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un usuario por ID.
 * GET /api/usuarios/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    const usuario = await userService.getUserById(req.params.id);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo usuario.
 * POST /api/usuarios
 */
export const createUser = async (req, res, next) => {
  try {
    const usuario = await userService.createUser(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    next(error);
  }
};

/**
 * Actualizar un usuario por ID.
 * PUT /api/usuarios/:id
 */
export const updateUser = async (req, res, next) => {
  try {
    const usuario = await userService.updateUser(req.params.id, req.body);
    res.json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    next(error);
  }
};

/**
 * Eliminar un usuario (borrado lógico: activo = false).
 * DELETE /api/usuarios/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const usuario = await userService.deleteUser(req.params.id);
    res.json({ mensaje: "Usuario desactivado correctamente", usuario });
  } catch (error) {
    next(error);
  }
};
