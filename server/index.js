// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Importacion de paquetes y archivos necesarios 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // middleware
const jwtConfig = require('../jwt.config');
require('./models/usuario');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Configuraciones e initializacion
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const app = express(); // Creamos nuestra app

app.set('key', jwtConfig.clave); // Inicializamos el secret para crear el JWT
app.use(express.json()); // Configuracion para manejar solicitudes JSON
// Activamos CORS para todas las solicitudes con la configuracion de arriba.
app.use(
    cors(corsOptions)
  );

const PORT = process.env.PORT || '3001'; 
// Crear una configuracion de cors
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Conexion a MongoDB con Mongoose______
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?appName=${process.env.DB_CLUSTER}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Endpoints
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.post('/autenticar', async (req, res) => {
    // El frontend nos va a enviar usuario/contrasenha { user: "user1", pass: "pass2" }
    if(req.body.email) {
        // verificamos que el email exista
        const emailExistente = await Usuario.find({ email: req.body.email });
        if(emailExistente){
            const usuario = req.body.user;
            // TODO: comparar la contrasena recibida con la guardada en la bd
            // usar bcrypt.compare()
            // Crear el token
            const payload = {
                usuario,
                checked: true
            };
            const key = app.get('key');
            try {
                const token = jwt.sign(payload, key);
                res.send({
                    message: 'Token creado',
                    token
                });
            } catch (error) {
                res.send({
                    message: 'Hubo un error'
                })
            }
        } else {
            res.send({message: "El email no existe en nuestros registros"})
        }
        
    } else {
        res.send({message: "No se recibio el user"});
    }
});


// 5- Crear ruta que utilize el token TODO


// Escuchar una solicitud POST desde nuestro frontend en la ruta "/tarea"
app.post('/tarea', (req, res) => {
    console.log("Body de mi request", req.body);
    if(req.body) {
        res.send({message: `"Recibimos tu tarea.", ${req.body.tarea}`})
    } else {
        res.send({message: "No recibimos tu tarea"})
    }
});


// Hacemos que nuestra aplicacion escuche el puerto que configuramos
// con el metodo listen(puerto, callback)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
