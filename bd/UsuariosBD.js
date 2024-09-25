const {usuariosBD}=require("./conexion");//solicita a una sola variable porque la clase tiene 2
const Usuario=require("../clases/Usuario");
const { validarPassword, encriptarPassword } = require("../middlewares/funcionesPassword");

function validar(usuario){
    var valido=false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){//tiene que ser async pq tiene un await
    const usuarios=await usuariosBD.get();//espera a que la funcion reacciones pq si no se sale, esto es un array
    usuariosValidos=[];
    
    usuarios.forEach(usuario => {//esta entregando un solo usuario, es como un ciclo
        const usuario1=new Usuario({id:usuario.id, ...usuario.data()}); //los 3 puntos son para seguir el formato anterior
        if(validar(usuario1.datos)){
            usuariosValidos.push(usuario1.datos)//mete los usuarios validados al arreglo
        }
    });
    return usuariosValidos;
}

async function buscarPorId(id){//retorna un solo usuario
    var usuarioValido;
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()})
    
    if(validar(usuario1.datos)){
        usuarioValido=usuario1.datos;
    }
    return usuarioValido;
}

async function nuevoUsuario(data){
    const {hash,salt}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1 = new Usuario(data);
    var usuarioValido={};
    var usuarioGuardado=false;
    if(validar(usuario1.datos)){
        usuarioValido=usuario1.datos;
        await usuariosBD.doc().set(usuarioValido);
        usuarioGuardado=true;
    }
    return usuarioGuardado;
}

async function borrarUsuario(id){
    //console.log(await buscarPorId(id));
    var usuarioBorrado=false;
    if(await buscarPorId(id)!=undefined){
        console.log("Se borrara el usuario");
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

/*var data={
    nombre: "Morelos Pavón",
    usuario: "Morelos",
    password: "123"
}*/

module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId
}

//nuevoUsuario(data);