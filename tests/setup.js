/**
 * Configuración global para los tests.
 * Se ejecuta antes de todos.
 */

// Configurar variables de entorno para tests
process.env.NODE_ENV = "test";
process.env.MONGODB_URI = "mongodb://localhost:27017/base_node_express_test";
process.env.PORT = "0";
