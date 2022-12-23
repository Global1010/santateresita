const { Router } = require('express');
const { check } = require('express-validator');
const { userLogin, googleSingIn, VerUsuario } = require('../constrollers/loginController');
const { ExUSerID } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
const { validarDatosIn } = require('../middlewares/validarCampos');



const router = Router();

router.post('/login', [ 
    check('usu_ci', 'Nro C.I. es obligarotrio y minimo de 6 digitos').isNumeric().isLength({ min: 6 }),
    check('usu_password', 'El password es obligatorio').not().isEmpty(),
    validarDatosIn
],userLogin);


router.post('/google', [ 
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarDatosIn
],googleSingIn);


router.get('/user', validarJWT, VerUsuario);





module.exports = router;