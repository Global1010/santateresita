const bcryptjs = require('bcryptjs');
const { response, request }= require('express');
const Usuario = require('../models/usuario');

// usaurios paginados
const usuariosGet = async (req= request , res = response) => {
    //const {q, nombre = 'Sin Datos', apikey,page=1, limit=10 } = req.query;
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  usu_estado: 0} };

    const [total, usuarios] = await Promise.all([
       Usuario.count({limit: Number(limite),query}),
       Usuario.findAll({limit: Number(limite),offset: Number(desde)}, query)
    ]);

    res.json({
       total, usuarios
    });
}

  // Crear Usuarios
const usuarioPost = async (req, res = response) => {

    // validar todos campos que llegan y si es corrrecto
    const {usu_nombre ,usu_ci ,usu_password ,usu_telefo ,usu_fecnac ,usu_email } = req.body;
           
    try { 
    // verificar si ci ya existe
    const usuario  = new Usuario({ usu_nombre ,usu_ci ,usu_password ,usu_telefo ,usu_fecnac ,usu_email });
    
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.usu_password = bcryptjs.hashSync( usu_password, salt );     
        // guardar en la db
    await usuario.save();
        
        res.json(usuario);

    } catch (error) {
        console.log('error',error);
        
        res.status(400).json('Información no Válida');
    }
}
// actualizr usaurio
const usuariosPut = async (req, res = response) => {
       
    const {idu} = req.params;
    const {id, usu_password, usu_cargo, usu_estado, usu_email, ...resto } = req.body;
  
    if (usu_password) {
        const salt = bcryptjs.genSaltSync();
        resto.usu_password = bcryptjs.hashSync( usu_password, salt );
    }
       
    const user = await Usuario.update(resto, { where: {id:idu}});
        
    res.json({
        user,
        resto
    });
  }
// BORRAR USAURIO
const usuarioDelete = async (req, res = response) => {
    const { xid } = req.params;
    try {

        const usuario = await Usuario.update({usu_estado: 0}, {where: {id: xid}});     
       
        res.json(usuario);


    } catch (error) {
   
        console.log('error:', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
}  

module.exports = {
    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuarioDelete,
}