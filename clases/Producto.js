class Producto {
    constructor(data) {
        this.idProd = data.idProd;
        this.nombreProd = data.nombreProd;
        this.stock = data.stock;
        this.precio = data.precio;
    }

    set idProd(idProd) {
        this._idProd = idProd;
    }

    set nombreProd(nombreProd) {
        var nombreProdRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
        if (nombreProdRegex.test(nombreProd)){
            this._nombreProd = nombreProd;
        }
    }

    set stock(stock) {
        if (stock >= 0) {
            this._stock = stock;
        }
    }

    set precio(precio) {
        if (precio > 0) {
            this._precio = precio;
        }
    }

    get idProd() {
        return this._idProd;
    }

    get nombreProd() {
        return this._nombreProd;
    }

    get stock() {
        return this._stock;
    }

    get precio() {
        return this._precio;
    }

    get datos() {
        if(this.idProd!=undefined){
            return {
                idProd: this.idProd,
                nombreProd: this.nombreProd,
                stock: this.stock,
                precio: this.precio
            }
        }
        else{
            return {
                nombreProd: this.nombreProd,
                stock: this.stock,
                precio: this.precio
            }
        }
        
    }
}

module.exports = Producto;
