

const validaCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarjwt');
const validaRoles = require('../middlewares/validar-rol');



module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}