const { Router } = require('express');
const { check } = require('express-validator');
const { userLogin } = require('../constrollers/loginController');
const { Exci } = require('../helpers/dbValidators');
const { validarDatosIn } = require('../middlewares/validarCampos');



const router = Router();

router.post('/login', [ 
    check('usu_ci', 'Nro C.I. es obligarotrio y minimo de 6 digitos').isNumeric().isLength({ min: 6 }),
    check('usu_password', 'El password es obligatorio').not().isEmpty(),
    validarDatosIn
],userLogin);







module.exports = router;