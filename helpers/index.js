

const dbValidatos   = require('./dbValidators');
const googleVerify  = require('./googleVerify');
const generarJWT    = require('../helpers/generarToken');
const subirArchi    = require('./suber-archivo');


module.exports = {
    ...dbValidatos,
    ...googleVerify,
    ...generarJWT,
    ...subirArchi,
}