class Venta{
    constructor(data) {
        this.idVen = data.idVen;
        this.idUsu1 = data.idUsu1;
        this.idProd1 = data.idProd1;
        this.fechaHora = data.fechaHora;
        this.estatus = data.estatus;
    }

    set idVen(idVen) {
        this._idVen = idVen;
    }

    set idUsu1(idUsu1) {
        this._idUsu1 = idUsu1;
    }

    set idProd1(idProd1) {
        this._idProd1 = idProd1;
    }

    set fechaHora(fechaHora) {
        this._fechaHora = fechaHora;
    }

    set estatus(estatus) {
        this._estatus = estatus;
    }

    get idVen() {
        return this._idVen;
    }

    get idUsu1() {
        return this._idUsu1;
    }

    get idProd1() {
        return this._idProd1;
    }

    get fechaHora(){
        return this._fechaHora;
    }

    get estatus() {
        return this._estatus;
    }

    get datos() {
        if(this.idVen!=undefined){
            return {
                idVen: this.idVen,
                idUsu1: this.idUsu1,
                idProd1: this.idProd1,
                fechaHora: this.fechaHora,
                estatus:this.estatus
            }
        }
        else{
            return {
                idUsu1: this.idUsu1,
                idProd1: this.idProd1,
                fechaHora: this.fechaHora,
                estatus:this.estatus
            }
        }
        
    }
}

module.exports=Venta;