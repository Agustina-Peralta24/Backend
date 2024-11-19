const express = require('express');
const app = express();


app.use(express.json()); // en el cuerpo de la peticion viene un json,lo voy a transformar
//en un objeto JS y de esa manera lo puedo utilizar

//Rutas
app.get("/", (req, res) => {  // Ruta raíz principal del proyecto
    res.send("¡Hola Express!/-*-/*/!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// Rutas para productos
const productosRouter = require('./Router/productos.router');
app.use('/productos', productosRouter);

// Rutas para categorías
const categoriasRouter = require('./Router/categorias.router');
app.use('/categorias', categoriasRouter);

// Rutas para pedidos
const pedidosRouter = require('./Router/pedidos.router');
app.use('/pedidos', pedidosRouter);

// Rutas para clientes
const clientesRouter = require('./Router/clientes.router');
app.use('/clientes', clientesRouter);

// Rutas para sucursales
const sucursalesRouter = require('./Router/sucursales.router');
app.use('/sucursales', sucursalesRouter);

// Rutas para detalle pedido
const detalle_pedidoRouter = require('./Router/detalle_pedido.router');
app.use('/detalle_pedido', detalle_pedidoRouter);

