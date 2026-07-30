import mongoose from "mongoose";

/**
 * Conexión a MongoDB con Mongoose.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/base_node_express";
    await mongoose.connect(uri);
    console.log(`MongoDB conectado: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error conectando a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
