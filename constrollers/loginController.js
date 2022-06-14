const bcryptjs = require('bcryptjs');
const { response, request }= require('express');
const { gtoken } = require('../database/generarToken');
const Usuario = require('../models/usuario');

// LOGIN USAURIO
const userLogin = async (req= request , res = response) => {
    const { usu_ci, usu_password} = req.body;
        
    try {

        // validar si es usario esta activo
        const xusuario = await Usuario.findOne({ where: {usu_ci: usu_ci}});   
          
        if (!xusuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }
        if (!xusuario.dataValues.usu_estado) {
            return res.status(400).json({
                msg: 'Usuario Inactivo'
            });
        }

        
        const token = await gtoken(xusuario.dataValues.id);
        
        const validPas = bcryptjs.compareSync(usu_password, xusuario.dataValues.usu_password);
        if (!validPas) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        res.json({
            xusuario,
            token
        });

    } catch (error) {
            console.log('error', error);
            
        res.status(400).json({       
            msg: 'Hable con el Administrador'
        });
        
    }
}


module.exports = {
    userLogin
}

