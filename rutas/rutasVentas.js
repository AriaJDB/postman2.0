var rutas = require("express").Router();
var { mostrarVentas, nuevaVenta, borrarVenta, buscarVenPorId } = require("../bd/VentasBD");

rutas.get("/", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/buscarVenPorId/:id", async (req, res) => {
    var ventaValida = await buscarVenPorId(req.params.id);
    res.json(ventaValida);
});

rutas.post("/nuevaVenta", async (req, res) => {
    var ventaGuardada = await nuevaVenta(req.body);
    res.json(ventaGuardada);
});

rutas.delete("/borrarVenta/:id", async (req, res) => {
    var ventaCancelada = await borrarVenta(req.params.id);
    res.json(ventaCancelada);
});

module.exports = rutas;
