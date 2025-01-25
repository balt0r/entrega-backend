import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

// Importar los managers de productos y usuarios
import productsManager from "./src/data/fs/products.fs.js";
import usersManager from "./src/data/fs/users.fs.js";

// Inicializar el servidor
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// Configuración del motor de plantillas Handlebars
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Middlewares
server.use(morgan("dev"));
server.use(express.static("public"));
server.use("/assets", express.static("assets"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Rutas de productos
server.get("/api/products", async (req, res) => {
  const { category } = req.query;
  const all = await productsManager.readAll(category);
  if (all.length > 0) {
    return res.status(200).json({ response: all });
  }
  return res.status(404).json({ response: "Not found!" });
});

server.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.readOne(pid);
  if (one) {
    return res.status(200).json({ response: one });
  }
  return res.status(404).json({ response: "Not found!" });
});

server.post("/api/products", async (req, res) => {
  const data = req.body;
  const one = await productsManager.create(data);
  return res.status(201).json({ response: one });
});

server.put("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateOne(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
});

server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
});

// Rutas de usuarios
server.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    // Validaciones básicas
    if (!data.email) {
      const error = new Error("Type email!");
      error.statusCode = 400;
      throw error;
    }
    if (!data.password) {
      const error = new Error("Type password!");
      error.statusCode = 400;
      throw error;
    }
    if (!data.age) {
      const error = new Error("Type age!");
      error.statusCode = 400;
      throw error;
    }
    if (data.age < 18) {
      const error = new Error("At least 18!");
      error.statusCode = 400;
      throw error;
    }

    // Crear el usuario
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await usersManager.readAll();
    return res.status(200).json({ response: allUsers });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
});

server.delete("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyOne(uid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
});

// Rutas previas y middlewares
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);