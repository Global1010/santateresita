const bcryptjs = require('bcryptjs');
const { response, request }= require('express');
const { gtoken } = require('../helpers/generarToken');
const { googleVerify } = require('../helpers/googleVerify');
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

const googleSingIn = async ( req, res = response) => {
    const { id_token } = req.body;

    try {
        
        const {usu_nombre, usu_img, usu_email } = await googleVerify(id_token);
                
        let xusuario = await Usuario.findOne({ where: {	usu_email: usu_email}});   

       
        if ( xusuario.length <= 0 ) {
            const data = {
                usu_nombre: usu_nombre,
                usu_ci: Math.floor(Math.random()*1000000001),
                usu_email: usu_email,
                usu_password: '--',
                usu_foto: usu_img,
                usu_google: true
            };
            
            xusuario = new Usuario(data);
            await xusuario.save();

            
        }
        if (!xusuario.dataValues.usu_estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario Bloqueado'
            });
        }
        const token = await gtoken(xusuario.dataValues.id);
        console.log('token', token);

        res.json({
            xusuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: ' El token no se pudo vefificar'
        });
    }



}

const VerUsuario = async (req= request , res = response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });


}

module.exports = {
    userLogin,
    googleSingIn,
    VerUsuario
}

