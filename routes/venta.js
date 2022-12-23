
const { Router } = require('express');
const { check } = require('express-validator');
const { nuevaVenta } = require('../constrollers/venta');
const { validarDatosIn, validarJWT } = require('../middlewares');


const router = Router();


router.post('/', [
    validarJWT
], nuevaVenta);


module.exports = router;