Base Node.js + Express + MongoDB (Atlas) para el IFT29 pp2? con idea mock

## Estructura del proyecto

```
base_node_express/
├── .env                          # Variables de entorno (configura tu URI de Atlas)
├── .gitignore                    # node_modules, .env ignorados
├── package.json                  # Dependencias + scripts start/dev/test
├── src/
│   ├── server.js                 # Entry point (conecta DB + inicia servidor)
│   ├── app.js                    # Configuración Express (cors, json, morgan, rutas, error handler)
│   ├── config/
│   │   └── db.js                 # Conexión a MongoDB con Mongoose
│   ├── controllers/
│   │   ├── userController.js     # CRUD usuarios (getAll, getById, create, update, delete lógico)
│   │   └── productController.js  # CRUD productos (getAll, getById, create, update, delete lógico)
│   ├── middlewares/
│   │   └── errorHandler.js       # Manejo global de errores (ValidationError, CastError, genéricos)
│   ├── models/
│   │   ├── User.js               # Schema: nombre, email, password, rol (admin/usuario/invitado), descripcion, activo, timestamps
│   │   └── Product.js            # Schema: nombre, descripcion, precio, categoria, stock, activo, timestamps
│   ├── routes/
│   │   ├── index.js              # Agrupa rutas bajo /api + health check
│   │   ├── userRoutes.js         # /api/usuarios (GET, GET/:id, POST, PUT/:id, DELETE/:id)
│   │   └── productRoutes.js      # /api/productos (GET, GET/:id, POST, PUT/:id, DELETE/:id)
│   └── validators/
│       ├── userValidator.js      # Validación de creación/actualización de usuarios
│       └── productValidator.js   # Validación de creación/actualización de productos
└── tests/
    ├── setup.js                  # Configuración de entorno para tests
    ├── validators.test.js        # 11 tests unitarios de validadores ✓
    └── health.test.js            # 1 test de integración health check ✓
```

## Funcionalidades implementadas

1. **Arquitectura modular organizada** (modelos, controladores, rutas, middlewares, validadores separados)
2. **MongoDB con Mongoose** (schemas con validaciones, timestamps, índices únicos)
3. **Middlewares** (cors, json parsing, morgan logging, error handler global)
4. **Rutas RESTful** con CRUD completo para usuarios y productos
5. **Validaciones simples** en los validadores antes de llegar a los controladores
6. **Programación asincrónica** con async/await en todos los controladores
7. **Borrado lógico** (activo: false) en lugar de borrado físico
8. **12 tests pasando** (11 unitarios + 1 de integración)

## Para usar con MongoDB Atlas

1. Editar `.env` y reemplazar:

   ```
   MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/base_node_express?retryWrites=true&w=majority
   ```

2. Ejecutar:
   ```bash
   npm run dev      # Modo desarrollo con --watch
   npm start        # Producción
   npm test         # Ejecutar tests
   ```

## Endpoints de la API

| Método | Endpoint             | Descripción                                             |
| ------ | -------------------- | ------------------------------------------------------- |
| GET    | `/api/health`        | Health check                                            |
| GET    | `/api/usuarios`      | Listar usuarios (?incluirInactivos=true)                |
| GET    | `/api/usuarios/:id`  | Obtener usuario por ID                                  |
| POST   | `/api/usuarios`      | Crear usuario                                           |
| PUT    | `/api/usuarios/:id`  | Actualizar usuario                                      |
| DELETE | `/api/usuarios/:id`  | Desactivar usuario (borrado lógico)                     |
| GET    | `/api/productos`     | Listar productos (?incluirInactivos=true&categoria=...) |
| GET    | `/api/productos/:id` | Obtener producto por ID                                 |
| POST   | `/api/productos`     | Crear producto                                          |
| PUT    | `/api/productos/:id` | Actualizar producto                                     |
| DELETE | `/api/productos/:id` | Desactivar producto (borrado lógico)                    |
