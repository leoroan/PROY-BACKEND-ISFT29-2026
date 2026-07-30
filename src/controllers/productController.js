import * as productService from "../services/productService.js";

/**
 * Controlador de Productos.
 * Solo se encarga de recibir la request, llamar al servicio y enviar la response.
 */

/**
 * Obtener todos los productos (activos por defecto).
 * GET /api/productos
 */
export const getProducts = async (req, res, next) => {
  try {
    const { incluirInactivos, categoria } = req.query;
    const productos = await productService.getAllProducts(incluirInactivos === "true", categoria);
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un producto por ID.
 * GET /api/productos/:id
 */
export const getProductById = async (req, res, next) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo producto.
 * POST /api/productos
 */
export const createProduct = async (req, res, next) => {
  try {
    const producto = await productService.createProduct(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un producto por ID.
 * PUT /api/productos/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const producto = await productService.updateProduct(req.params.id, req.body);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un producto (borrado lógico: activo = false).
 * DELETE /api/productos/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const producto = await productService.deleteProduct(req.params.id);
    res.json({ mensaje: "Producto desactivado correctamente", producto });
  } catch (error) {
    next(error);
  }
};
