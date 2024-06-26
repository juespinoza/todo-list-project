// Hacemos el import de Express.js
const express = require('express');

// 1- Importar jsonwebtoken
const jwt = require('jsonwebtoken');

// Hacemos el import del middleware CORS
const cors = require('cors');

// Creamos nuestra app backend con el metodo express()
const app = express();

// 2- Configurar nuestro secret
const jwtConfig = require('../jwt.config');
app.set('key', jwtConfig.clave);

// 3- BodyParser y express.json()
// Activar el middleware express.json para convertir las solicitudes con body-stringified
app.use(express.json());

// Configuramos un puerto especifico desde una variable de entorno 
// sino existe entonces asignamos el puerto 3001
const PORT = process.env.PORT || '3001';

// Password de BD
const password = process.env.DB_PASS || 'Jul143sp1n0z4';

// TODO: tenemos que configurar CORS para acceso desde el frontend

// Crear una configuracion de cors
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Conexion a MongoDB con Mongoose______

// TODO: hacer que la dominio se lea desde una variable de entorno
// TODO: hacer que la usuario se lea desde una variable de entorno
// TODO: hacer que el password lea desde una variable de entorno
// TODO: hacer que el password lea desde una variable de entorno
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/?appName=${process.env.DB_CLUSTER}`;

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
//_____________________________________________

// Activamos CORS para todas las solicitudes con la configuracion de arriba.
app.use(
    cors(corsOptions)
  );


// 4- Escucha post (/autenticar) que responda con token a nuestro frontend
app.post('/autenticar', (req, res) => {
    // El frontend nos va a enviar usuario/contrasenha { user: "user1", pass: "pass2" }
    if(req.body.user) {
        // TODO: VERIFICACION de que el usuario exista en nuestra base de datos 
        const usuario = req.body.user;
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
