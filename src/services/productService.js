import Product from "../models/Product.js";

/**
 * Servicio de Productos.
 * Contiene toda la logica de negocio relacionada con productos.
 */

/**
 * Obtener todos los productos.
 * @param {boolean} incluirInactivos
 * @param {string} categoria - Filtro opcional por categoria.
 * @returns {Promise<Array>}
 */
export const getAllProducts = async (incluirInactivos = false, categoria = null) => {
  const filtro = incluirInactivos ? {} : { activo: true };

  if (categoria) {
    filtro.categoria = categoria.toLowerCase();
  }

  const productos = await Product.find(filtro);
  return productos;
};

/**
 * Obtener un producto por ID.
 * @param {string} id
 * @returns {Promise<Object>}
 * @throws {Error} 404 si no existe.
 */
export const getProductById = async id => {
  const producto = await Product.findById(id);
  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }
  return producto;
};

/**
 * Crear un nuevo producto.
 * @param {Object} datos - { nombre, descripcion, precio, categoria, stock }.
 * @returns {Promise<Object>}
 */
export const createProduct = async datos => {
  const { nombre, descripcion, precio, categoria, stock } = datos;
  const producto = await Product.create({
    nombre,
    descripcion,
    precio,
    categoria,
    stock,
  });
  return producto;
};

/**
 * Actualizar un producto por ID.
 * @param {string} id
 * @param {Object} datos - Campos a actualizar.
 * @returns {Promise<Object>}
 * @throws {Error} 404 si no existe.
 */
export const updateProduct = async (id, datos) => {
  const producto = await Product.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  });

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }
  return producto;
};

/**
 * Desactivar un producto (borrado logico).
 * @param {string} id
 * @returns {Promise<Object>}
 * @throws {Error} 404 si no existe.
 */
export const deleteProduct = async id => {
  const producto = await Product.findByIdAndUpdate(id, { activo: false }, { new: true });

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }
  return producto;
};
