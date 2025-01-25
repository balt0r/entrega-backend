# Proyecto: Entrega Backend

Este proyecto es un servidor backend implementado en Node.js con Express. Proporciona un sistema de autenticación por token (JWT) para proteger rutas y gestionar usuarios y productos. Además, utiliza bcrypt para encriptar contraseñas y handlebars como motor de plantillas para renderizar vistas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) (normalmente incluido con Node.js)

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/balt0r/entrega-backend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd entrega-backend
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Configuración

Asegúrate de configurar el entorno del proyecto:

1. Crea un archivo `.env` en el directorio raíz del proyecto (opcional si deseas configurar variables sensibles).

2. Define la clave secreta del token JWT en el archivo `.env` o directamente en el código:

   ```env
   SECRET_KEY=mi_clave_secreta
   ```

## Uso

### Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

O, si está configurado para desarrollo:

```bash
npm run dev
```

El servidor estará disponible en el puerto `8080` por defecto.

### Endpoints disponibles

#### Usuarios

1. **Crear usuario**:

   - Ruta: `POST /api/users`
   - Body (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "123456",
       "age": 25
     }
     ```

2. **Listar usuarios**:

   - Ruta: `GET /api/users`

3. **Eliminar usuario**:
   - Ruta: `DELETE /api/users/:uid`

#### Autenticación

1. **Iniciar sesión**:
   - Ruta: `POST /login`
   - Body (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "123456"
     }
     ```
   - Respuesta: Devuelve un token JWT.

#### Productos (rutas protegidas)

1. **Listar productos**:

   - Ruta: `GET /api/products`
   - Header: `Authorization: Bearer <token>`

2. **Obtener producto por ID**:

   - Ruta: `GET /api/products/:pid`
   - Header: `Authorization: Bearer <token>`

3. **Crear producto**:

   - Ruta: `POST /api/products`
   - Header: `Authorization: Bearer <token>`
   - Body (JSON):
     ```json
     {
       "name": "Producto 1",
       "price": 100
     }
     ```

4. **Actualizar producto**:

   - Ruta: `PUT /api/products/:pid`
   - Header: `Authorization: Bearer <token>`
   - Body (JSON):
     ```json
     {
       "price": 150
     }
     ```

5. **Eliminar producto**:
   - Ruta: `DELETE /api/products/:pid`
   - Header: `Authorization: Bearer <token>`

### Estructura del proyecto

```plaintext
entrega-backend/
├── src/
│   ├── data/
│   │   ├── fs/
│   │   │   ├── products.fs.js
│   │   │   ├── users.fs.js
│   ├── middlewares/
│   │   ├── errorHandler.mid.js
│   │   ├── pathHandler.mid.js
│   ├── routers/
│   │   ├── index.router.js
│   ├── views/
│   │   ├── layouts/
│   │   ├── ...
├── public/
├── utils.js
├── server.js
```

## Notas adicionales

- Asegúrate de tener los datos iniciales en los archivos JSON de `products.fs.js` y `users.fs.js`.
- Las contraseñas de los usuarios se almacenan encriptadas usando `bcrypt`.

## Recursos

- [Documentación de Express](https://expressjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)
