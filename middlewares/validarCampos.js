const { response, request }= require('express');
const { validationResult } = require('express-validator');


const validarDatosIn = (req = request, res = response, next ) => {

    const valiDato = validationResult(req);
 
    if( !valiDato.isEmpty() ) {
        return res.status(400).json(valiDato);
    }
    next();
}

module.exports = {
    validarDatosIn
}