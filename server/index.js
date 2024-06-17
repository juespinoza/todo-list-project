// Hacemos el import de Express.js
const express = require('express');

const cors = require('cors');

// Creamos nuestra app backend con el metodo express()
const app = express();

// Configuramos un puerto especifico desde una variable de entorno 
// sino existe entonces asignamos el puerto 3001
const PORT = process.env.PORT || '3001';

// Escuchar una solicitud POST desde nuestro frontend en la ruta "/tarea"
app.post('/tarea', (req, res) => {
    console.log("Body de mi request", req.body);
    if(req.body) {
        res.send({message: "Recibimos tu tarea."})
    } else {
        res.send({message: "No recibimos tu tarea"})
    }
});

// TODO: tenemos que configurar CORS para acceso desde el frontend
app.use(
    cors({
      origin: "*"
    })
  );

// Hacemos que nuestra aplicacion escuche el puerto que configuramos
// con el metodo listen(puerto, callback)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
