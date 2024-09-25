var rutas = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarProdPorId } = require("../bd/ProductosBD");

rutas.get("/", async (req, res) => {
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

rutas.get("/buscarProdPorId/:id", async (req, res) => {
    var productoValido = await buscarProdPorId(req.params.id);
    res.json(productoValido);
});

rutas.post("/nuevoProducto", async (req, res) => {
    var productoGuardado = await nuevoProducto(req.body);
    res.json(productoGuardado);
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

module.exports = rutas;
