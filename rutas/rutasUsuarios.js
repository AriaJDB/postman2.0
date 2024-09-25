var rutas=require("express").Router();
var {mostrarUsuarios,nuevoUsuario,borrarUsuario,buscarPorId}=require("../bd/UsuariosBD");
//var {Router}=require("express"); es lo mismo que lo de arriba

rutas.get("/",async(req,res)=>{
   // res.send("Hola, estas en raiz");
   var usuariosValidos = await mostrarUsuarios();
   //console.log(usuariosValidos);
   res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
   var usuarioValido = await buscarPorId(req.params.id);
   res.json(usuarioValido);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
   var usuarioGuardado = await nuevoUsuario(req.body);
   res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
   var usuarioBorrado = await borrarUsuario(req.params.id);
   res.json(usuarioBorrado);
});

module.exports=rutas;