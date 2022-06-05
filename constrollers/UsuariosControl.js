const { response, request }= require('express');

const usuariosGet = (req= request , res = response) => {
    const {q, nombre = 'Sin Datos', apikey,page=1, limit=10 } = req.query;
    res.json({
        msg: 'get API - Controlador',
        q, nombre, apikey, page, limit
    });
  }

const usuarioPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'get POST - Contolador',
        nombre,
        edad
    });
  }

const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
        msg: 'get PUT - controlador',
        id
    });
  }
const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'get PATCH - controlador'
    });
}
const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'get DELETE - Controlador'
    });
}  

module.exports = {
    usuariosGet,
    usuarioPost,
    usuariosPut,
    usuarioPatch,
    usuarioDelete,
}