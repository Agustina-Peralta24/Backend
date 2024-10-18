const express = require('express');
const app = express();


app.use(express.json()); // en el cuerpo de la peticion viene un json,lo voy a transformar
//en un objeto JS y de esa manera lo puedo utilizar


app.get("/", (req, res) => {  // Ruta raíz principal del proyecto
    res.send("¡Hola Express!/-*-/*/!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// Rutas para productos
const productosRouter = require('./Router/productos.router');
app.use('/productos', productosRouter);

