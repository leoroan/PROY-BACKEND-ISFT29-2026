import User from "../models/User.js";

/**
 * Servicio de Usuarios.
 * Contiene toda la lógica de negocio relacionada con usuarios.
 * Los controladores solo se encargan de recibir la request y enviar la response.
 */

/**
 * Obtener todos los usuarios.
 * @param {boolean} incluirInactivos - Si es true, incluye usuarios desactivados.
 * @returns {Promise<Array>} Lista de usuarios (sin password).
 */
export const getAllUsers = async (incluirInactivos = false) => {
  const filtro = incluirInactivos ? {} : { activo: true };
  const usuarios = await User.find(filtro).select("-password");
  return usuarios;
};

/**
 * Obtener un usuario por ID.
 * @param {string} id - ID del usuario.
 * @returns {Promise<Object>} Usuario encontrado (sin password).
 * @throws {Error} Si el usuario no existe.
 */
export const getUserById = async id => {
  const usuario = await User.findById(id).select("-password");
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }
  return usuario;
};

/**
 * Crear un nuevo usuario.
 * @param {Object} datos - { nombre, email, password, rol, descripcion }.
 * @returns {Promise<Object>} Usuario creado (sin password).
 * @throws {Error} Si el email ya está registrado.
 */
export const createUser = async datos => {
  const { nombre, email, password, rol, descripcion } = datos;
  const usuario = await User.create({
    nombre,
    email,
    password,
    rol,
    descripcion,
  });
  const { password: _, ...usuarioSinPassword } = usuario.toObject();
  return usuarioSinPassword;
};

/**
 * Actualizar un usuario por ID.
 * @param {string} id - ID del usuario.
 * @param {Object} datos - Campos a actualizar.
 * @returns {Promise<Object>} Usuario actualizado (sin password).
 * @throws {Error} Si el usuario no existe o el email ya está registrado.
 */
export const updateUser = async (id, datos) => {
  const usuario = await User.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }
  return usuario;
};

/**
 * Desactivar un usuario (borrado lógico).
 * @param {string} id - ID del usuario.
 * @returns {Promise<Object>} Usuario desactivado (sin password).
 * @throws {Error} Si el usuario no existe.
 */
export const deleteUser = async id => {
  const usuario = await User.findByIdAndUpdate(id, { activo: false }, { new: true }).select("-password");

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }
  return usuario;
};
