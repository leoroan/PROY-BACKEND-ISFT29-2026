import mongoose from "mongoose";

/**
 * Esquema de Producto.
 * Campos: nombre, descripcion, precio, categoria, stock, activo
 */
const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [150, "El nombre no puede exceder 150 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [1000, "La descripción no puede exceder 1000 caracteres"],
      default: "",
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    categoria: {
      type: String,
      trim: true,
      lowercase: true,
      default: "general",
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
