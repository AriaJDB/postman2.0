const { productosBD } = require("./conexion");
const Producto = require("../clases/Producto");

function validar(producto) {
    var valido=false;
    if(producto.nombreProd !== undefined && producto.stock !== undefined && producto.precio !== undefined){
        valido=true;
    }
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    productosValidos = [];

    productos.forEach(producto => {
        const producto1 = new Producto({ idProd: producto.idProd, ...producto.data() });
        if (validar(producto1.datos)) {
            productosValidos.push(producto1.datos);
        }
    });
    return productosValidos;
}

async function buscarProdPorId(id) {
    var productoValido;
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({idProd:producto.idProd,...producto.data()});

    if(validar(producto1.datos)){
        productoValido=producto1.datos;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValido={};
    var productoGuardado = false;

    if (validar(producto1.datos)) {
        productoValido=producto1.datos;
        await productosBD.doc().set(productoValido);
        productoGuardado = true;
    }
    return productoGuardado;
}

async function borrarProducto(id) {
    var productoBorrado = false;
    if (await buscarProdPorId(id) != undefined) {
        console.log("Se borrara el producto");
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarProdPorId
};
