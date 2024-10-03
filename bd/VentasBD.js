const { ventasBD } = require("./conexion");
const Venta = require("../clases/Venta");

function validar(venta) {
    var valida=false;
    if(venta.idUsu1 !== undefined && venta.idProd1 !== undefined && venta.fechaHora !== undefined && venta.estatus !== undefined){
        valida=true;
    }
    return valida;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    ventasValidas = [];

    ventas.forEach(venta => {
        const venta1 = new Venta({ idVen: venta.idVen, ...venta.data() });
        if (validar(venta1.datos)) {
            ventasValidas.push(venta1.datos);
        }
    });
    return ventasValidas;
}

async function buscarVenPorId(id) {
    var ventaValida;
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({idVen:venta.idVen,...venta.data()});

    if(validar(venta1.datos)){
        ventaValida=venta1.datos;
    }
    return ventaValida;
}

async function nuevaVenta(data) {
    const fechaHoraActual = new Date();
    data.fechaHora = fechaHoraActual.toISOString();
    data.estatus="vendido";
    const venta1 = new Venta(data);
    var ventaValida={};
    var ventaGuardada = false;

    if (validar(venta1.datos)) {
        ventaValida=venta1.datos;
        await ventasBD.doc().set(ventaValida);
        ventaGuardada = true;
    }
    return ventaGuardada;
}

async function borrarVenta(id) {
    var ventaCancelada = false;
    const venta = await buscarVenPorId(id);  // Verificar si la venta existe

    if (venta != undefined) {
        console.log("Se cancelará la venta");
        await ventasBD.doc(id).update({ estatus: "cancelado" });
        ventaCancelada = true;
    }
    return ventaCancelada;
}


module.exports = {
    mostrarVentas,
    nuevaVenta,
    borrarVenta,
    buscarVenPorId
};
