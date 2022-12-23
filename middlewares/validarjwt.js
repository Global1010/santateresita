const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('sice-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token Necesario en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.LLAVEENCRIPTADOSICE);
        req.uid = uid;
        
        const usuario = await Usuario.findOne({where: { id: uid }});

        if (!usuario ) {
            return res.status(400).json({
                msg: 'usuario no existe' 
            });
        }
                
        if(!usuario.dataValues.usu_estado ) {
           return res.status(400).json({
           msg: 'usuario no autorizado'
        });
    }

       req.usuario = usuario;
   
        next();
    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }

}





module.exports = {
    validarJWT
}