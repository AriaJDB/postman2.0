const express = require("express");
const usuarioRutas = require("./rutas/rutasUsuarios");
const productoRutas = require("./rutas/rutasProductos");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", usuarioRutas);
app.use("/productos", productoRutas); // Cambia la ruta base para productos

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
