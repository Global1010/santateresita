const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validarjwt');
const { tieneRol } = require('../middlewares');
const { validarDatosIn } = require('../middlewares/validarCampos');
const { InfoCobro } = require('../constrollers/infoCobro');


const router = Router();

router.get('/', [
    validarJWT,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('usu_fecha', 'La Fecha es Obligatorio').not().isEmpty(),
    validarDatosIn
],InfoCobro);


module.exports = router;