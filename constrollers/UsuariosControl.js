const bcryptjs = require('bcryptjs');
const { response, request }= require('express');
const Usuario = require('../models/usuario');


const usuariosGet = async (req= request , res = response) => {
    //const {q, nombre = 'Sin Datos', apikey,page=1, limit=10 } = req.query;
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  usu_estado: 1} };

    const [total, usuarios] = await Promise.all([
        Usuario.count(query ),
        Usuario.findAll(query,
            {  limit: Number(limite), 
                offset: Number(desde)
            },
        )
    ]);

    res.json({
        total, usuarios
    });
  }

  // Crear Usuarios
const usuarioPost = async (req, res = response) => {

    // validar todos campos que llegan y si es corrrecto

    const data = { usu_nombre ,usu_ci ,usu_password ,usu_telefo ,usu_fecnac ,usu_email } = req.body;
       
    try { 
    // verificar si ci ya existe
   const usuario = await Usuario.create(data);

 
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

    const user = await Usuario.update(resto , {where: { id: idu} } );

    res.json({
        msg: 'get PUT - controlador',
        user,
        resto
    });
  }
const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'get PATCH - controlador'
    });
}
const usuarioDelete = async (req, res = response) => {
    const { xid } = req.params;
    console.log('xid',xid );
    
    try {

        const usuario = await Usuario.update({usu_estado: 0}, {where: {id: xid}});     
        res.json( usuario );

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
    usuarioPatch,
    usuarioDelete,
}