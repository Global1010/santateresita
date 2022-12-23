

const validaCampos = require('../middlewares/validarCampos');
const validaRoles = require('../middlewares/validar-rol');
const validarJWT  = require('../middlewares/validarjwt');
const validarArchivo = require('../middlewares/validar-archivo');


module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validarJWT,
    ...validarArchivo
}