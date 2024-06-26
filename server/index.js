// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Importar paquetes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Importar y configurar dotenv para usar las variables de entorno
require("dotenv").config();

// Hacemos el import de Express.js
const express = require("express");

// 1- Importar jsonwebtoken
const jwt = require("jsonwebtoken");

// Hacemos el import del middleware CORS
const cors = require("cors");

// Hacemos el import de nuestro archivo de configuracion de jwt
const jwtConfig = require("../jwt.config");

// Importamos mongoose y bcrypt
const mongoose = require("mongoose");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Configuracion e inicializacion
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Creamos nuestra app backend con el metodo express()
const app = express();

// 2- Configurar nuestro secret
app.set("key", jwtConfig.clave);

// 3- BodyParser y express.json()
// Activar el middleware express.json para convertir las solicitudes con body-stringified
app.use(express.json());

// Configuramos un puerto especifico desde una variable de entorno
// sino existe entonces asignamos el puerto 3001
const PORT = process.env.PORT || "3001";

// TODO: tenemos que configurar CORS para acceso desde el frontend

// Crear una configuracion de cors
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Activamos CORS para todas las solicitudes con la configuracion de arriba.
app.use(cors(corsOptions));

// Middleware verify para la validar el JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Conexión a la base de datos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${DB_DOMAIN}/?appName=${DB_CLUSTER}`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

// Define un esquema para las colecciones Usuario y Tarea
const userSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  email: String,
  password: String,
});

const taskSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  done: Boolean,
  email: String,
});

// Creamos los modelos de las colecciones para poder utilizarlas
const Usuario = mongoose.model("Usuario", userSchema);
const Tarea = mongoose.model("Tarea", taskSchema);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + APIs endpoints
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ruta para registrar un usuario
app.post("/api/register", async (req, res) => {
  try {
    // Chequeamos si el email existe en nuestra base de datos
    const existingUser = await Usuario.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creamos el objeto usuario desde el modelo Usuario
    const newUser = new Usuario({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para autenticar al usuario y hacer login
app.post("/api/login", async (req, res) => {
  try {
    // Chequeamos si el email existe
    const user = await Usuario.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "El email no existe en nuestra base de datos" });
    }

    // Comparar las contraseñas
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Las contraseñas no son correctas" });
    }

    // Generate JWT token
    const secret = app.get("key");
    const token = jwt.sign({ email: user.email }, secret);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta progetida para traer los detalles del usuario
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    // Fetch user details using decoded token
    const user = await Usuario.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("API del proyecto ToDo List del Bootcamp de ProgramandoPY");
});

// 4- Escucha post (/autenticar) que responda con token a nuestro frontend
app.post("/autenticar", (req, res) => {
  // El frontend nos va a enviar usuario/contrasenha { user: "user1", pass: "pass2" }
  if (req.body.user) {
    // TODO: VERIFICACION de que el usuario exista en nuestra base de datos
    const usuario = req.body.user;
    // Crear el token
    const payload = {
      usuario,
      checked: true,
    };
    const key = app.get("key");
    try {
      const token = jwt.sign(payload, key);
      res.send({
        message: "Token creado",
        token,
      });
    } catch (error) {
      res.send({
        message: "Hubo un error",
      });
    }
  } else {
    res.send({ message: "No se recibio el user" });
  }
});

// 5- Crear ruta que utilize el token TODO

// Escuchar una solicitud POST desde nuestro frontend en la ruta "/tarea"
app.post("/tarea", verifyToken, (req, res) => {
  console.log("Body de mi request", req.body);
  if (req.body) {
    res.send({ message: `"Recibimos tu tarea.", ${req.body.tarea}` });
  } else {
    res.send({ message: "No recibimos tu tarea" });
  }
});

// Hacemos que nuestra aplicación escuche el puerto que configuramos
// con el metodo listen(puerto, callback)
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
